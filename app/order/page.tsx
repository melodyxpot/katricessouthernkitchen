"use client";
import React, { useCallback, useEffect, useState } from "react";
import Section from "../_components/section";
import ProductCard from "./_components/product-card";
import SearchInput from "@/components/SearchInput";
import { getCategoriesApi, getProductsApi } from "@/server/strapi";
import toast from "react-hot-toast";

const defaultCategory: Category = {
  id: 0,
  name: "all",
  active: true
};

export default function Page() {
  const [search, setSearch] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category>(defaultCategory);
  const [products, setProducts] = useState<Product[]>([]);
  /**
   * Fetch categories
   */
  const getCategories = async () => {
    try {
      const res = await getCategoriesApi();
      if (res.success) {
        setCategories([
          { id: 0, name: "All", active: true },
          ...res.result.map((i: any) => ({
            id: i.id,
            name: i.attributes.name,
            active: true
          }))
        ]);
      } else {
        console.error(res.error);
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("--- getCategories ---", error);
      toast.error("Server Error");
    }
  };

  /**
   * Fetch products
   */
  const getProducts = useCallback(async () => {
    try {
      const res = await getProductsApi(category.id, search);
      if (res.success) {
        setProducts([
          ...res.result.map((item: any) => ({
            id: item.id,
            priceId: item.attributes.priceId,
            name: item.attributes.name,
            description: item.attributes.description,
            price: item.attributes.price,
            category: item.attributes.category.data.attributes.categoryId
          }))
        ]);
      } else {
        console.error(res.error);
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("--- getProducts ---", error);
      toast.error("Server Error");
    }
  }, [category.id, search]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts();
  }, [category, search, getProducts]);

  return (
    <Section className="flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3 w-full justify-between">
        <div className="flex gap-1">
          {categories.map((i) => (
            <button
              key={i.id}
              className={`border border-primary w-24 px-3 py-1 hover:bg-primary hover:text-white transition rounded-lg ${
                category.id === i.id
                  ? "bg-primary text-white"
                  : "bg-transparent text-primary"
              }`}
              onClick={() => setCategory(i)}
            >
              {i.name}
            </button>
          ))}
        </div>
        <SearchInput setSearch={setSearch} />
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>
    </Section>
  );
}
