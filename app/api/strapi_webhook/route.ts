import { updateStrapiProductApi } from "@/server/strapi";
import {
  createStripeProduct,
  setStripeProductAndPriceStatus,
  updateStripeProduct
} from "@/server/stripe";
enum StrapiEvent {
  ENTRY_CREATE = "entry.create",
  ENTRY_PUBLISH = "entry.publish",
  ENTRY_UNPUBLISH = "entry.unpublish",
  ENTRY_DELETE = "entry.delete",
  ENTRY_UPDATE = "entry.update"
}

export const POST = async (request: Request) => {
  try {
    const res = await request.json();
    const event = res.event;

    if (res.model === "product") {
      if (event === StrapiEvent.ENTRY_PUBLISH) {
        if (res.entry.priceId === null) {
          const newProduct = {
            id: res.entry.id,
            name: res.entry.name,
            description: res.entry.description,
            price: res.entry.price,
            priceId: res.entry.priceId
          };

          const { priceId, productId } = await createStripeProduct(
            newProduct.name,
            newProduct.price,
            newProduct.description
          );

          const { success, result } = await updateStrapiProductApi(
            newProduct.id,
            {
              priceId
            }
          );

          if (success) {
            console.log("new product is added", result);
          }
        } else {
          const { success, result } = await setStripeProductAndPriceStatus(
            res.entry.priceId,
            { active: false }
          );

          if (success) {
            console.log("product is activated", result);
          }
        }
      } else if (event === StrapiEvent.ENTRY_UNPUBLISH) {
        const { success, result } = await setStripeProductAndPriceStatus(
          res.entry.priceId,
          { active: false }
        );

        if (success) {
          console.log("product is deactivated", result);
        }
      } else if (event === StrapiEvent.ENTRY_DELETE) {
        const { success, result } = await setStripeProductAndPriceStatus(
          res.entry.priceId,
          { active: false }
        );

        if (success) {
          console.log("product is deactivated", result);
        }
      }
      // else if (event === StrapiEvent.ENTRY_UPDATE) {
      //   const { success, result } = await updateStripeProduct(
      //     res.entry.priceId,
      //     res.entry.name,
      //     res.entry.price,
      //     res.entry.description
      //   );
      //   if (success) {
      //     console.log("product is deactivated", result);
      //   }
      // }
    }
    return new Response(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error creating stripe product", {
      status: 500
    });
  }
};
