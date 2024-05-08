interface Product {
  name: string;
  desc?: string;
  price: number;
  priceId: string;
}

interface CartProduct {
  name: string;
  quantity: number;
  price: number;
  priceId: string;
}

interface Category {
  id: string;
  name: string;
  active?: boolean;
}
