import { FileWithPath } from '@mantine/dropzone';
import { SizeWithPrice } from './product-price-size';
import { GlobalUser } from './app';

export interface creteShopDto {
  name: string,
  id: number,
  token: string,
}

export enum ProductStatus {
  PUBLISHED = 'Published',
  DRAFT = 'Draft',
  ARCHIVED = 'Archived'
}

export interface ProductImage {
  id: string;
  name: string | null;
  url: string;
  altText: string;
  product?: Product
}

export type INewProduct = {
  name: string;
  description: string;
  status: ProductStatus;
  sizes: SizeWithPrice[];
  files: FileWithPath[];
  category: string;
  stock: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  status: ProductStatus;
  product_sizes: SizeWithPrice[];
  images: ProductImage[];
  category: Category;
  stock: number;
  created_at: string;
  shop?: Shop
  user?: GlobalUser
};


export type ShopProduct = {
  id: string;
  name: string;
  description: string;
  images: ProductImage[];
  colors?: string[];
  quantity: number;
  product_sizes: SizeWithPrice[];
  discount: number | null;
};

export interface IProduct {
  name: string;
  description: string;
  price: number;
  image: string[];
}

export interface Shop {
  name: string;
  id: number;
  user?: GlobalUser;
}

export interface ProductWithShop extends ShopProduct {
  shop: Shop;
}

export interface ShopWithProducts extends Shop {
  products: Product[];
}

export interface CartItem {
  quantity: number;
  id: string;
  size: SizeWithPrice;
  color: string;
  customer_description: string;
  product: ShopProduct;
}

export interface SubCategory {
  id: number;
  name: string;
}
export interface Category {
  id: string;
  name: string;
  categories?: SubCategory[];
}

export interface CategoryWithProducts extends Category {
  products: ProductWithShop[]
}