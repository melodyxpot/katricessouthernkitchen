"use server";

import Stripe from "stripe";
import { stripe } from "@/utils/stripe/config";
import { getURL, getErrorRedirect } from "@/utils/helpers";

type CheckoutResponse = {
  errorRedirect?: string;
  // sessionId?: string;
  session?: Stripe.Response<Stripe.Checkout.Session>;
};

export async function checkoutWithStripe(
  products: Array<{ priceId: string; quantity: number }>,
  redirectPath: string = "/"
): Promise<CheckoutResponse> {
  try {
    let params: Stripe.Checkout.SessionCreateParams = {
      allow_promotion_codes: true,
      billing_address_collection: "required",
      line_items: products.map((product) => ({
        price: product.priceId,
        quantity: product.quantity
      })),
      cancel_url: getURL(),
      success_url: getURL(redirectPath)
    };

    params = {
      ...params,
      mode: "payment"
    };

    // Create a checkout session in Stripe
    let session;
    try {
      session = await stripe.checkout.sessions.create(params);
    } catch (err) {
      console.error(err);
      throw new Error("Unable to create checkout session.");
    }

    // Instead of returning a Response, just return the data or error.
    if (session) {
      // return { sessionId: session.id };
      return { session };
    } else {
      throw new Error("Unable to create checkout session.");
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        errorRedirect: getErrorRedirect(
          redirectPath,
          error.message,
          "Please try again later or contact a system administrator."
        )
      };
    } else {
      return {
        errorRedirect: getErrorRedirect(
          redirectPath,
          "An unknown error occurred.",
          "Please try again later or contact a system administrator."
        )
      };
    }
  }
}
