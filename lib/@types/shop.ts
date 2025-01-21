import { FileWithPath } from '@mantine/dropzone';
import { SizeWithPrice } from './product-price-size';

export enum ProductStatus {
  PUBLISHED = 'Published',
  DRAFT = 'Draft',
  ARCHIVED = 'Archived'
}

export interface ProductImage {
  id: number;
  name: string | null;
  url: string;
  altText: string;
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
  id: number;
  name: string;
  description: string;
  status: ProductStatus;
  product_sizes: SizeWithPrice[];
  images: ProductImage[];
  category: string;
  stock: number;
  created_at: string;
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
}

export interface ProductWithShop extends ShopProduct {
  shop: Shop;
}

export interface ShopWithProducts extends Shop {
  products: ShopProduct[];
}

export interface Order {
  quantity: number;
  id: number;
  size: string;
  color: string;
  customer_description: string;
  product: ShopProduct;
}

export interface SubCategory {
  id: number;
  name: string;
}
export interface Category {
  id: number;
  name: string;
  categories?: SubCategory[];
}

export interface CategoryWithProducts extends Category {
  products: ProductWithShop[]
}