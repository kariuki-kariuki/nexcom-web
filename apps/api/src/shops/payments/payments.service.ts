import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import {
  CallbackMetadata,
  MpesaFailure,
  MpesaResponse,
  OrderState,
  StkCallBack,
  StkCallBackFailure,
} from 'src/@types/types';
import { OrdersService } from '../orders/orders.service';

type DarajaTokenRes = {
  access_token: string;
  expires_in: string;
};

type SanitizedData = {
  amount: number;
  mpesaReceiptNumber: string;
  transactionDate: Date;
  phoneNumber: number;
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
  private buffer = Buffer.from(
    `${this.darajaConsumer}:${this.darajaSecret}`,
  ).toString('base64');

  // token cache
  private tokenCache: { token: string; expiry: Date } | null = null;

  // constructor
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @Inject(forwardRef(() => OrdersService))
    private readonly ordersService: OrdersService,
  ) {
    if (!process.env.DA_SECRET_KEY || !process.env.DA_CONSUMER_KEY) {
      throw new Error('Missing required environment variables for Daraja');
    }
  }
  async create(createPaymentDto: MpesaResponse | MpesaFailure | any) {
    console.log(createPaymentDto);
    if (createPaymentDto.Body.stkCallback.ResultCode === 0) {
      await this.handleSuccessfulPayment(createPaymentDto.Body.stkCallback);
    } else {
      await this.handleFailedPayment(createPaymentDto.Body.stkCallBack);
    }
  }
  async handleSuccessfulPayment(stkCallBack: StkCallBack) {
    const { CallbackMetadata, CheckoutRequestID } = stkCallBack;
    const sanitizedData = this.sanitizeData(CallbackMetadata);
    const order =
      await this.ordersService.findOneByChekoutID(CheckoutRequestID);
    const payment = this.mapPaymentEntity(sanitizedData, stkCallBack);
    order.cartItems.map((cartItem) => (cartItem.ordered = true));
    order.status = OrderState.SUCCESS;
    payment.order = order;
    try {
      this.paymentRepository.save(payment);
    } catch (e) {
      this.logger.error('Error saving payment', e);
    }
  }

  async handleFailedPayment(stkCallBack: StkCallBackFailure) {
    const { ResultDesc, ResultCode, CheckoutRequestID } = stkCallBack;
    const order =
      await this.ordersService.findOneByChekoutID(CheckoutRequestID);
    order.resultCode = ResultCode;
    order.resultDesc = ResultDesc;
    order.status = OrderState.FAILED;
    await this.ordersService.updateFailed(order);
  }

  private mapPaymentEntity(
    sanitizedData: SanitizedData,
    stkCallBack: StkCallBack,
  ): Payment {
    const { mpesaReceiptNumber, amount, transactionDate, phoneNumber } =
      sanitizedData;
    const { CheckoutRequestID, ResultDesc, MerchantRequestID } = stkCallBack;
    const payment = new Payment();
    payment.mpesaReceiptNumber = mpesaReceiptNumber;
    payment.amount = amount;
    payment.checkoutRequestId = CheckoutRequestID;
    payment.resultDesc = ResultDesc;
    payment.merchantRequestId = MerchantRequestID;
    payment.transactionDate = new Date(transactionDate);
    payment.phoneNumber = phoneNumber;
    return payment;
  }

  sanitizeData(mpesaMetadata: CallbackMetadata): SanitizedData {
    try {
      const findValue = (name: string) => {
        return mpesaMetadata.Item.find(
          (item) => item.Name === name,
        )?.Value.toString();
      };
      return {
        amount: parseInt(findValue('Amount') || '0'),
        transactionDate: new Date(findValue('TransactionDate')),
        phoneNumber: parseInt(findValue('PhoneNumber')),
        mpesaReceiptNumber: findValue('MpesaReceiptNumber'),
      };
    } catch (e) {
      this.logger.error('Error snitizing: ', e.message);
    }
  }

  async stkPush({ phone }: { phone: string }) {
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
      Amount: '1',
      PartyA: `254${phone}`, // Replace with dynamic data if necessary
      PartyB: this.darajaShortCode,
      PhoneNumber: `254${phone}`, // Replace with dynamic data if necessary
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
      if (res.data) {
        this.logger.log('STK Push Response:', res.data);
        return res.data;
      }
    } catch (error) {
      this.logger.log('STK Push Error:', error.response?.data || error.message);
      throw new Error('STK Push failed');
    }
  }

  findAll() {
    return 'This action returns all payments';
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    updatePaymentDto;
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }

  private createPassword() {
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:T]/g, '')
      .slice(0, 14); // Generate timestamp in YYYYMMDDHHMMSS format
    const password = Buffer.from(
      `${this.darajaShortCode}${this.darajaPassKey}${timestamp}`,
    ).toString('base64');
    return { timestamp, password };
  }

  private async getToken(): Promise<string | null> {
    if (this.tokenCache && this.tokenCache.expiry > new Date()) {
      return this.tokenCache.token;
    }

    try {
      const res = await axios.get<DarajaTokenRes>(this.darajaAuthUrl, {
        headers: {
          Authorization: `Basic ${this.buffer}`,
        },
      });
      const token = res.data?.access_token || null;
      if (token) {
        this.tokenCache = {
          token,
          expiry: new Date(
            Date.now() + (parseInt(res.data.expires_in) - 10) * 1000,
          ),
        };
        return token;
      }
    } catch (error) {
      this.logger.error(
        'Token Retrieval Error:',
        error.response?.data || error.message,
      );
      return null;
    }
  }
}
