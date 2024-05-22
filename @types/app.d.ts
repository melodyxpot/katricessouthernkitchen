declare interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceId: string;
  productId: string;
  category: string;
}

declare interface CartProduct {
  id: string;
  name: string;
  price: number;
  priceId: string;
  quantity: number;
}

declare interface Category {
  id: number;
  name: string;
  active?: boolean;
}
