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
  images: string[];
  colors?: string[];
  quantity: number;
  sizes: string;
  price: number;
  discount: number | null;
};
