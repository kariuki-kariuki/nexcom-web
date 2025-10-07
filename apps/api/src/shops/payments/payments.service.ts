import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import {
  stkCallback,
  OrderState,
  stkCallbackFailure,
  CallbackMetadata,
  PaymentStatus, // Added import
} from '../../@types/types';

type DarajaTokenRes = {
  access_token: string;
  expires_in: string;
};

type SanitizedData = {
  amount: number;
  mpesaReceiptNumber: string;
  transactionDate: Date;
  phoneNumber: string; // Changed to string to match entity
};

@Injectable()
export class PaymentsService {
  private logger = new Logger(PaymentsService.name);
  private readonly darajaSecret = process.env.DA_SECRET_KEY;
  private readonly darajaConsumer = process.env.DA_CONSUMER_KEY;
  private readonly darajaAuthUrl = process.env.DA_AUTH_URL;
  private readonly darajaPassKey = process.env.DA_PASS_KEY;
  private readonly darajaStkUrl = process.env.DA_STK_URL;
  private readonly darajaCallBackURL = process.env.DA_CALLBACK_URL;
  private readonly darajaShortCode = process.env.DA_SHORT_CODE;
  private readonly buffer = Buffer.from(
    `${this.darajaConsumer}:${this.darajaSecret}`,
  ).toString('base64');

  private tokenCache: { token: string; expiry: Date } | null = null;

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
    if (!this.darajaSecret || !this.darajaConsumer) {
      throw new Error('Missing required environment variables for Daraja');
    }
  }

  async create(createPaymentDto: any) {
    this.logger.debug('Mpesa Response', createPaymentDto);

    try {
      if (createPaymentDto.Body.stkCallback.ResultCode === 0) {
        await this.handleSuccessfulPayment(createPaymentDto.Body.stkCallback);
      } else {
        await this.handleFailedPayment(createPaymentDto.Body.stkCallback); // Fixed typo: stkCallback -> stkCallback
      }
    } catch (error) {
      this.logger.error('Error processing payment', error);
      throw new InternalServerErrorException('Failed to process payment');
    }
  }

  async handleSuccessfulPayment(stkCallback: stkCallback) {
    const {
      CallbackMetadata,
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      MerchantRequestID,
    } = stkCallback;
    const sanitizedData = this.sanitizeData(CallbackMetadata);
    const order = await this.orderRepository.findOneBy({
      checkoutRequestId: CheckoutRequestID,
    });

    if (!order) {
      this.logger.error(
        `Order not found for CheckoutRequestID: ${CheckoutRequestID}`,
      );
      throw new NotFoundException('Order not found');
    }

    const payment = this.mapPaymentEntity(sanitizedData, stkCallback);
    payment.status = PaymentStatus.SUCCESS; // Set payment status
    payment.resultCode = ResultCode; // Ensure resultCode is set
    payment.resultDesc = ResultDesc; // Ensure resultDesc is set
    payment.merchantRequestId = MerchantRequestID; // Ensure merchantRequestId is set

    order.cartItems.forEach((cartItem) => (cartItem.ordered = true)); // Use forEach for clarity
    order.status = OrderState.SUCCESS;
    payment.order = order;

    await this.orderRepository.save(order);
    await this.paymentRepository.save(payment);
  }

  private async handleFailedPayment(stkCallback: stkCallbackFailure) {
    const { ResultDesc, ResultCode, CheckoutRequestID } = stkCallback;
    const order = await this.findOrderByCheckoutID(CheckoutRequestID);

    if (!order) {
      this.logger.error(
        `Order not found for CheckoutRequestID: ${CheckoutRequestID}`,
      );
      throw new NotFoundException('Order not found');
    }

    order.resultCode = ResultCode;
    order.resultDesc = ResultDesc;
    order.status = OrderState.FAILED;

    const payment = await this.paymentRepository.findOneBy({
      checkoutRequestId: CheckoutRequestID,
    });
    if (payment) {
      payment.status = PaymentStatus.FAILED; // Update payment status
      payment.failureReason = ResultDesc;
      await this.paymentRepository.save(payment);
    }

    await this.orderRepository.save(order);
  }

  private async findOrderByCheckoutID(
    checkoutRequestId: string,
  ): Promise<Order> {
    const order = await this.orderRepository.findOneBy({ checkoutRequestId });
    if (!order) {
      throw new NotFoundException(
        `Order with checkoutRequestId ${checkoutRequestId} not found`,
      );
    }
    return order;
  }

  private mapPaymentEntity(
    sanitizedData: SanitizedData,
    stkCallback: stkCallback,
  ): Payment {
    const { mpesaReceiptNumber, amount, phoneNumber, transactionDate } =
      sanitizedData;
    const { CheckoutRequestID, ResultDesc, MerchantRequestID } = stkCallback;
    const payment = new Payment();
    payment.mpesaReceiptNumber = mpesaReceiptNumber;
    payment.amount = amount;
    payment.checkoutRequestId = CheckoutRequestID;
    payment.resultDesc = ResultDesc;
    payment.merchantRequestId = MerchantRequestID;
    payment.transactionDate = transactionDate; // Use sanitized transactionDate
    payment.phoneNumber = phoneNumber;
    payment.status = PaymentStatus.SUCCESS; // Default to success for successful payments
    return payment;
  }

  private sanitizeData(mpesaMetadata: CallbackMetadata): SanitizedData {
    try {
      const findValue = (name: string) => {
        const item = mpesaMetadata.Item.find((item) => item.Name === name);
        if (!item || item.Value === undefined) {
          throw new Error(`Missing or invalid value for ${name}`);
        }
        return item.Value.toString();
      };

      const transactionDateStr = findValue('TransactionDate');
      const transactionDate = new Date(
        parseInt(transactionDateStr.slice(0, 4)), // Year
        parseInt(transactionDateStr.slice(4, 6)) - 1, // Month (0-based)
        parseInt(transactionDateStr.slice(6, 8)), // Day
        parseInt(transactionDateStr.slice(8, 10)), // Hour
        parseInt(transactionDateStr.slice(10, 12)), // Minute
        parseInt(transactionDateStr.slice(12, 14)), // Second
      );

      return {
        amount: parseFloat(findValue('Amount')), // Use parseFloat for decimal support
        transactionDate,
        phoneNumber: findValue('PhoneNumber'),
        mpesaReceiptNumber: findValue('MpesaReceiptNumber'),
      };
    } catch (e) {
      this.logger.error('Error sanitizing data: ', e.message);
      throw new InternalServerErrorException('Failed to sanitize payment data');
    }
  }

  async stkPush({ phone, amount }: { phone: string; amount: number }) {
    if (!phone || amount <= 0) {
      throw new Error('Invalid phone number or amount');
    }

    const token = await this.getToken();
    if (!token) {
      throw new Error('Failed to retrieve token from Daraja');
    }

    const { timestamp, password } = this.createPassword();
    const data = {
      BusinessShortCode: this.darajaShortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount.toString(),
      PartyA: `254${phone}`,
      PartyB: this.darajaShortCode,
      PhoneNumber: `254${phone}`,
      CallBackURL: this.darajaCallBackURL,
      AccountReference: 'Test',
      TransactionDesc: 'Test',
    };

    try {
      const res = await axios.post(this.darajaStkUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      this.logger.error(
        'STK Push Error:',
        error.response?.data || error.message,
      );
      throw new Error(
        `STK Push failed: ${error.response?.data?.errorMessage || error.message}`,
      );
    }
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find({ relations: ['order'] });
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['order'],
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async update(
    id: string,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    const payment = await this.findOne(id);
    Object.assign(payment, updatePaymentDto);
    return this.paymentRepository.save(payment);
  }

  async remove(id: string): Promise<void> {
    const payment = await this.findOne(id);
    await this.paymentRepository.remove(payment);
  }

  private createPassword() {
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:T]/g, '')
      .slice(0, 14);
    const password = Buffer.from(
      `${this.darajaShortCode}${this.darajaPassKey}${timestamp}`,
    ).toString('base64');
    return { timestamp, password };
  }

  private async getToken(): Promise<string> {
    if (this.tokenCache && this.tokenCache.expiry > new Date()) {
      return this.tokenCache.token;
    }

    try {
      const res = await axios.get<DarajaTokenRes>(this.darajaAuthUrl, {
        headers: {
          Authorization: `Basic ${this.buffer}`,
        },
      });

      const token = res.data.access_token;
      if (!token) {
        throw new Error('No token received from Daraja');
      }

      this.tokenCache = {
        token,
        expiry: new Date(
          Date.now() + (parseInt(res.data.expires_in) - 10) * 1000,
        ),
      };
      return token;
    } catch (error) {
      this.logger.error(
        'Token Retrieval Error:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to retrieve Daraja token');
    }
  }

  async requestStatus(id: string): Promise<string> {
    const rqBody = {
      Initiator: 'testapi',
      SecurityCredential: process.env.DA_SECURITY_CREDENTIAL, // Use environment variable
      CommandID: 'TransactionStatusQuery',
      TransactionID: id,
      PartyA: this.darajaShortCode,
      IdentifierType: '4',
      ResultURL: this.darajaCallBackURL, // Reuse callback URL
      QueueTimeOutURL: this.darajaCallBackURL, // Reuse callback URL
      Remarks: 'OK',
      Occasion: 'OK',
    };

    const url =
      'https://sandbox.safaricom.co.ke/mpesa/transactionstatus/v1/query';
    const token = await this.getToken();

    try {
      const response = await axios.post(url, rqBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.logger.debug('Transaction status response:', response.data);
      return response.data;
    } catch (error) {
      this.logger.error(
        'Transaction Status Query Error:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to query transaction status');
    }
  }
}
