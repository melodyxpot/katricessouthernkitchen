"use server";

import { stripe } from "@/utils/stripe/config";

/**
 * @param {string} name
 * @param {number} unit_amount
 * @param {string} description
 * @returns {string, string} productId priceId
 */
export const createStripeProduct = async (
  name: string,
  unit_amount: number,
  description?: string
) => {
  try {
    const product = await stripe.products.create({
      name,
      description: description ? description : undefined
    });

    const price = await stripe.prices.create({
      currency: "usd",
      unit_amount: unit_amount * 100,
      product: product.id
    });

    return {
      productId: product.id,
      priceId: price.id
    };
  } catch (error: any) {
    throw new Error("createStripePrice Error", error);
  }
};

/**
 * @param {string} priceId
 * @param {any} update
 * @returns
 */
export const setStripeProductAndPriceStatus = async (
  priceId: string,
  update: any
) => {
  try {
    const price = await stripe.prices.update(priceId, update);
    const result = await stripe.products.update(
      price.product.toString(),
      update
    );
    return { success: true, result };
  } catch (error: any) {
    throw new Error("deleteStripeProduct Error", error);
  }
};

export const updateStripeProduct = async (
  priceId: string,
  name: string,
  unit_amount: number,
  description?: string
) => {
  try {
    let price = await stripe.prices.update(priceId, { active: false });

    price = await stripe.prices.create({
      currency: "usd",
      unit_amount: unit_amount * 100,
      product: price.product.toString()
    });

    const result = await stripe.products.update(price.product.toString(), {
      name,
      description: description ? description : undefined
    });
    return { success: true, result };
  } catch (error: any) {
    throw new Error("deleteStripeProduct Error", error);
  }
};
