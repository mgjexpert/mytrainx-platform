# XPayments Webhook — Signature Verification Blocker

**Date:** 2026-10-18  
**Provider endpoint in current integration:** `api.xpayments.digital`  
**Status:** payment reconciliation implemented / cryptographic webhook authentication pending provider-confirmed specification

## Current protections already implemented

The webhook does not grant access from a status string alone.

It currently validates:

- payload schema;
- known order reference;
- BRL currency;
- PIX payment method;
- provider transaction ID consistency;
- exact amount in cents;
- expected success event;
- expected success status;
- idempotent already-succeeded handling.

Only after those checks does it:

- mark the order succeeded;
- create/update entitlement;
- enroll the user into the corresponding active program.

## Security hardening completed 2026-10-18

Vercel variable visibility changed:

- `XPAYMENTS_API_KEY`: encrypted/readable → **sensitive**
- `XPAYMENTS_WEBHOOK_SECRET`: encrypted/readable → **sensitive**

Values were not copied into Git or documentation.

## Remaining blocker

The current XPayments integration code contains a deliberate TODO for cryptographic webhook verification.

A signature implementation requires provider-confirmed answers to all of:

1. exact signature header name;
2. HMAC/signature algorithm;
3. canonical signed payload:
   - raw request bytes?
   - JSON serialization?
   - timestamp + payload?
4. encoding:
   - hex?
   - base64?
5. timestamp/replay tolerance;
6. key/secret to use;
7. event retry behaviour.

A signature format documented by another similarly named payment provider must **not** be assumed to apply to `api.xpayments.digital`.

## Required provider evidence

Obtain one of:

- official XPayments.digital webhook documentation;
- official API reference;
- written provider confirmation;
- verified SDK/reference implementation.

## Implementation acceptance criteria

Once the provider scheme is known:

- [ ] read raw body before JSON parsing if required;
- [ ] verify signature with constant-time comparison;
- [ ] verify timestamp/replay window where specified;
- [ ] reject missing/invalid signatures before order lookup;
- [ ] retain existing reference/amount/transaction checks as defense in depth;
- [ ] add valid-signature test;
- [ ] add invalid-signature test;
- [ ] add modified-body test;
- [ ] add replay/timestamp test when supported;
- [ ] deploy and verify with a provider test event.

## Optional additional defense

If XPayments.digital exposes a server-to-server transaction lookup endpoint, consider verifying the transaction with the provider before granting entitlement. This also requires official endpoint documentation.

## Do not do

- do not invent an HMAC scheme;
- do not weaken the existing reconciliation checks;
- do not log API keys or webhook secrets;
- do not expose the webhook secret to the browser.
