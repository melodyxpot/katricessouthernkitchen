"use server";
import axios from "axios";
const strapiFetch = axios.create({
  baseURL: `${process.env.STRAPI_API ?? "http://localhost:1337/api/"}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `bearer ${process.env.STRAPI_API_TOKEN}`
  }
});

export const getCategoriesApi = async () => {
  try {
    const response = await strapiFetch.get(
      "/categories?fields[0]=name&fields[1]=categoryId"
    );
    return { success: true, result: response.data.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};

export const getProductsApi = async (categoryId = 0, searchQuery = "") => {
  const categoryQuery =
    categoryId === 0 ? "" : `&filters[category][$eq]=${categoryId}`;
  try {
    const response = await strapiFetch.get(
      `/products?filters[name][$containsi]=${searchQuery}${categoryQuery}&fields[0]=name&fields[1]=priceId&fields[2]=description&fields[3]=price&populate=*`
    );
    return { success: true, result: response.data.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};

/**
 * @param {string} productId
 * @param {any} update
 * @returns
 */
export const updateStrapiProductApi = async (
  productId: string,
  update: any
) => {
  try {
    const response = await strapiFetch.put(`/products/${productId}`, {
      data: {
        priceId: update.priceId
      }
    });

    console.log("strapi product update", response.data.data);
    return { success: true, result: response.data.data };
  } catch (error: any) {
    console.log("--- updateStrapiProductApi Error ---", error);
    return { success: false, error: error.response.data };
  }
};
