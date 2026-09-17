import { ChargeParams, PaymentProvider, PaymentResult } from "./types";
import { delay } from "./utils";

/**
 * PaymentProvider is the seam between the UI and whatever actually moves
 * money. The checkout/payment screens only ever talk to this interface,
 * so swapping MockOPayProvider for a real OPay (or Paystack, Flutterwave,
 * etc.) integration later is a one-line change in getPaymentProvider().
 *
 * MockOPayProvider never contacts a real payment gateway and never
 * handles real card, wallet, or account credentials. It exists purely to
 * demonstrate the shape of a real integration for this portfolio build.
 */
export class MockOPayProvider implements PaymentProvider {
  name = "OPay (demo)";

  async charge({ orderNumber, amount }: ChargeParams): Promise<PaymentResult> {
    // Simulate the round trip to a payment gateway.
    await delay(1700);

    // Occasionally simulate a declined/failed charge so the UI's error
    // and retry states are real, exercised paths rather than dead code.
    const succeeded = Math.random() > 0.12;

    if (!succeeded) {
      return {
        success: false,
        reference: "",
        message:
          "OPay could not confirm this payment. No funds were moved — please try again.",
      };
    }

    const reference = `OPAY-DEMO-${Date.now().toString(36).toUpperCase()}`;

    return {
      success: true,
      reference,
      message: `Payment of the order ${orderNumber} total was confirmed.`,
    };
  }
}

/**
 * Factory so callers never construct a provider directly. In production
 * this could branch on an environment variable (e.g. PAYMENT_PROVIDER)
 * to return a real gateway implementation instead.
 */
export function getPaymentProvider(): PaymentProvider {
  return new MockOPayProvider();
}
