"use server";

import { stripe } from "@/utils/stripe/config";
import { updateProductApi } from "./strapi";

/**
 * @param {string} name
 * @param {number} unit_amount
 * @param {string} description
 * @returns {string, string} productId priceId
 */
export const createProduct = async (entry: any) => {
  try {
    const product = await stripe.products.create({
      name: entry.name,
      active: false,
      default_price_data: {
        currency: "usd",
        unit_amount: entry.price * 100
      },
      description: entry.description ? entry.description : undefined
    });

    return {
      productId: product.id,
      priceId: product.default_price
    };
  } catch (error: any) {
    console.log(error);
    throw new Error("createProduct Error", error);
  }
};

export const setProductActiveStatus = async (
  productId: string,
  active: boolean
) => {
  try {
    const product = await stripe.products.update(productId, { active });

    return {
      newProductId: product.id,
      newPriceId: product.default_price
    };
  } catch (error: any) {
    console.log(error);
    throw new Error("setProductActiveStatus Error", error);
  }
};

/**
 * @param {string} priceId
 * @param {any} update
 * @returns
 */
export const deleteProduct = async (priceId: string, productId: string) => {
  try {
    const price = await stripe.prices.update(priceId, { active: false });
    await stripe.products.update(productId, { active: false });
    await stripe.products.del(productId);
    return { success: true, result: "deleted the product" };
  } catch (error: any) {
    throw new Error("deleteStripeProduct Error", error);
  }
};

export const updateStripeProduct = async (entry: any) => {
  try {
    const product = await stripe.products.retrieve(entry.productId);

    if (entry.productId === null || entry.priceId === null) {
      return { success: true, result: "This is create event" };
    }

    const price = await stripe.prices.retrieve(entry.priceId);

    if (product.name !== entry.name) {
      await stripe.products.update(entry.productId, { name: entry.name });
    }

    if (product.description !== entry.description ?? undefined) {
      await stripe.products.update(entry.productId, {
        description: entry.description ? entry.description : undefined
      });
    }

    if (price.unit_amount && price.unit_amount / 100 !== entry.price) {
      const newPrice = await stripe.prices.create({
        product: product.id,
        currency: "usd",
        unit_amount: entry.price * 100
      });
      await stripe.products.update(entry.productId, {
        default_price: newPrice.id
      });

      await updateProductApi(entry.id, { priceId: newPrice.id });
    }

    return { success: true, result: "updated the product" };
  } catch (error: any) {
    console.log(error);
    throw new Error("updateStripeProduct Error", error);
  }
};
