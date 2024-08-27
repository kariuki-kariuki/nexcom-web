// import { faker } from '@faker-js/faker';

import { GlobalUser } from './chat';

export interface IProduct {
  name: string;
  description: string;
  price: number;
  image: string[];
}

export type Product = {
  name: string;
  description: string;
  image: string;
  colors: string;
  quantity: number;
  sizes: string;
  files: FileWithPath[];
  price: number;
};

export type ShopProduct = {
  id: string;
  name: string;
  description: string;
  images: string[];
  colors?: string[];
  quantity: number;
  sizes: string;
  price: number;
  discount: number | null;
};

export interface Shop {
  name: string;
  id: number;
}

interface ShopWithUser extends Shop {
  user: GlobalUser;
}
export interface ProductWithShop extends ShopProduct {
  shop: Shop;
}

export interface ShopWithProducts extends Shop {
  products: ShopProduct[];
}

export interface Order {
  quantity: number;
  size: string;
  id: number;
  size: string;
  color: string;
  customer_description: string;
  product: ShopProduct;
}
