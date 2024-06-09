"use server";

import Stripe from "stripe";
import { stripe } from "@/utils/stripe/config";
import { getURL, getErrorRedirect, getTokenWithJwt } from "@/utils/helpers";
import { randomUUID } from "crypto";

export async function checkoutWithStripe(
  products: Array<{ priceId: string; quantity: number }>,
  redirectPath: string = "/"
): Promise<string> {
  try {
    const purchaseId = randomUUID();
    const token = await getTokenWithJwt({ id: purchaseId });

    let params: Stripe.Checkout.SessionCreateParams = {
      allow_promotion_codes: true,
      billing_address_collection: "required",
      line_items: products.map((product) => ({
        price: product.priceId,
        quantity: product.quantity
      })),
      phone_number_collection: {
        enabled: true,
      },
      cancel_url: await getURL(`?checkout=${token}&status=cancel`),
      success_url: await getURL(`?checkout=${token}&status=success`),
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
      return JSON.stringify({ session, purchaseId });
    } else {
      throw new Error("Unable to create checkout session.");
    }
  } catch (error) {
    if (error instanceof Error) {
      return JSON.stringify({
        errorRedirect: getErrorRedirect(
          redirectPath,
          error.message,
          "Please try again later or contact a system administrator."
        )
      });
    } else {
      return JSON.stringify({
        errorRedirect: getErrorRedirect(
          redirectPath,
          "An unknown error occurred.",
          "Please try again later or contact a system administrator."
        )
      });
    }
  }
}
