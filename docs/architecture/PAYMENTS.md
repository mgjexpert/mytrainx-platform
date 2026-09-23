# Payments — XPayments PIX S2S

## Charge

```
POST https://api.xpayments.digital/api/v1/payments/charge
x-api-key: XPAYMENTS_API_KEY
Content-Type: application/json
```

Example WKT amount:

`6700 = R$67.00`

Payload fields:

- amount
- currency = BRL
- payment_method_types = ["pix"]
- reference
- customer.name
- customer.document
- metadata.order_id
- metadata.product

## Response

Store:

- transactionId
- reference
- status
- action.copyPaste
- action.qrCodeBase64 / qrCode / qrCodeUrl

## Fulfillment

`pending` is not paid.

Only:

```
event = payment_intent.succeeded
status = succeeded
```

activates entitlement.

Webhook target for MyTrainX production:

`https://mytrainx.fit/api/webhooks/xpayments`

During migration, do not remove the WKT production webhook until MyTrainX is fully live.

## Security

Webhook handler validates:

- local reference exists
- transaction ID matches
- BRL
- PIX
- exact amount
- final succeeded state
- idempotency

Cryptographic signature verification must be implemented only after the official XPayments signing header/algorithm is confirmed.
