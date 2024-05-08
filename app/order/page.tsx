import React from "react";
import Section from "../_components/section";
import ProductCard from "./_components/product-card";
import { products } from "@/data/products";
import SearchInput from "@/components/SearchInput";
import { categories } from "@/data/categories";

const defaultCategory = "meats";

export default function Page() {
  return (
    <Section className="flex-col gap-3">
      <div className="flex w-full justify-between">
        <div className="flex gap-1">
          {categories.map((i) => (
            <button
              key={i.id}
              className={`border border-primary px-3 py-1 hover:bg-primary hover:text-white transition rounded-lg ${
                defaultCategory === i.id
                  ? "bg-primary text-white"
                  : "bg-transparent text-primary"
              }`}
            >
              {i.name}
            </button>
          ))}
        </div>
        <SearchInput />
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>
    </Section>
  );
}
