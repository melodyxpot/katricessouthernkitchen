import { updateProductApi } from "@/server/strapi";
import {
  createProduct,
  setProductActiveStatus,
  deleteProduct,
  updateStripeProduct
} from "@/server/stripe";

// Strapie Event types
enum StrapiEvent {
  ENTRY_CREATE = "entry.create",
  ENTRY_PUBLISH = "entry.publish",
  ENTRY_UNPUBLISH = "entry.unpublish",
  ENTRY_DELETE = "entry.delete",
  ENTRY_UPDATE = "entry.update"
}

/**
 * Strapi Event Trigger
 * @method POST
 * @param { Request } request
 * @returns { Response }
 * @description Triggers strapi events and CRUD products in stripe
 */
export const POST = async (request: Request) => {
  try {
    const res = await request.json();
    const event = res.event;

    /** Product CRUD Events */
    if (res.model === "product") {
      /** Create Event */
      if (event === StrapiEvent.ENTRY_CREATE) {
        if (res.entry.priceId || res.entry.productId) {
          return Response.json(
            { success: false, result: "Don't add priceId, productId" },
            { status: 400 }
          );
        }

        const { priceId, productId } = await createProduct(res.entry);

        const { success, result } = await updateProductApi(res.entry.id, {
          priceId,
          productId
        });

        return Response.json(
          { success, result, event: StrapiEvent.ENTRY_CREATE },
          { status: 200 }
        );
      }
      /** Publish Event */
      if (event === StrapiEvent.ENTRY_PUBLISH) {
        const { priceId, productId } = res.entry;
        const { newPriceId, newProductId } = await setProductActiveStatus(
          productId,
          true
        );
        return Response.json(
          {
            result: { priceId: newPriceId, productId: newProductId },
            event: StrapiEvent.ENTRY_PUBLISH
          },
          { status: 200 }
        );
      }
      /** Unpublish Event */
      if (event === StrapiEvent.ENTRY_UNPUBLISH) {
        const { priceId, productId } = res.entry;
        const { newPriceId, newProductId } = await setProductActiveStatus(
          productId,
          false
        );
        return Response.json(
          {
            result: { priceId: newPriceId, productId: newProductId },
            event: StrapiEvent.ENTRY_PUBLISH
          },
          { status: 200 }
        );
      }
      /** Update Event */
      if (event === StrapiEvent.ENTRY_UPDATE) {
        const { success, result } = await updateStripeProduct(res.entry);
        if (success) {
          return new Response(result, { status: 200 });
        }
      }
      /** Delete Event */
      if (event === StrapiEvent.ENTRY_DELETE) {
        const { success, result } = await deleteProduct(
          res.entry.priceId,
          res.entry.productId
        );

        if (success) {
          console.log("product is deleted", result);
        }
      }
    }
    return new Response(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error creating stripe product", {
      status: 500
    });
  }
};
