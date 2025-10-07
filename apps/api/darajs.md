{
  "MerchantRequestID": "7044-4916-b865-aa2fb98409549573",
  "CheckoutRequestID": "ws_CO_07102025151807808742075647",
  "ResponseCode": "0",
  "ResponseDescription": "Success. Request accepted for processing",
  "CustomerMessage": "Success. Request accepted for processing"
}

{
  Body: {
    stkCallback: {
      MerchantRequestID: "7044-4916-b865-aa2fb98409549573",
      CheckoutRequestID: "ws_CO_07102025151807808742075647",
      ResultCode: 2001,
      ResultDesc: "The initiator information is invalid.",
    },
  },
}

{
  Body: {
    stkCallback: {
      MerchantRequestID: "ec67-43aa-9362-0f167cc2e9de61478",
      CheckoutRequestID: "ws_CO_07102025152041539742075647",
      ResultCode: 0,
      ResultDesc: "The service request is processed successfully.",
      CallbackMetadata: {
        Item: [
          {
            Name: "Amount",
            Value: 1,
          },
          {
            Name: "MpesaReceiptNumber",
            Value: "TJ7H76SYD8",
          },
          {
            Name: "Balance",
          },
          {
            Name: "TransactionDate",
            Value: 20251007152054,
          },
          {
            Name: "PhoneNumber",
            Value: 254742075647,
          },
        ],
      },
    },
  },
}