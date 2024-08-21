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
  name: string;
  description: string;
  images: string[];
  colors: string;
  quantity: number;
  sizes: string;
  price: number;
  discount: number | null
};

interface Shop {
  name: string,
  id: string
  user: GlobalUser
}
export interface ProductWithShop  extends ShopProduct {
  shop: Shop;
}