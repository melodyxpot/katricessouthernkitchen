declare interface Product {
  name: string;
  desc?: string;
  price: number;
  priceId: string;
  category: string;
}

declare interface CartProduct {
  name: string;
  quantity: number;
  price: number;
  priceId: string;
}

declare interface Category {
  id: number;
  name: string;
  active?: boolean;
}
