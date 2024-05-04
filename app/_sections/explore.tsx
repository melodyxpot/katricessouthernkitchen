import React from "react";
import SubTitle from "../_components/subtitle";
import FoodItem from "../_components/food-item";

import ServiceImage from "@/assets/img/service_img.png";
import Section from "../_components/section";

export default function Explore() {
  return (
    <Section className="flex-col">
      <SubTitle>What would you like to have today?</SubTitle>
      <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
        <FoodItem image={ServiceImage} />
        <FoodItem image={ServiceImage} />
        <FoodItem image={ServiceImage} />
      </div>
    </Section>
  );
}
