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

export interface ImageInterface {
  id: string;
  name: string | null;
  url: string;
  altText: string;
  signedUrl: string;
  product?: Product;
}

export type INewProduct = {
  name: string;
  description: string;
  status: ProductStatus;
  sizes: Omit<SizeWithPrice, 'id'>[];
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
  images: ImageInterface[];
  category: Category;
  stock: number;
  created_at: string;
  shop?: Shop
  user?: GlobalUser
  comments: ProductComment[]
  analytics?: AnalyticInterface[]
  cartItems: CartItem[];
  updated_at: string;
};


export type ShopProduct = {
  id: string;
  name: string;
  description: string;
  images: ImageInterface[];
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

interface Order {
  id: string;
  orderNumber: number;
  amount: number;
}


export interface Shop {
  name: string;
  id: string;
  user?: GlobalUser;
  bannerImage: ImageInterface,
  phone: number;
  category: Category;
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
  created_at: Date;
}

export interface AnalyticInterface {
  id: string;
  product: Product;
  created_at: string;
}

export interface ProductAnalytics extends Product {
  analytics: AnalyticInterface[];
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

export interface ProductVideo {
  id: string;
  name: string | null;
  url: string;
  description: string;
  signedUrl: string;
  product: Product
}

// Product comment
export interface ProductComment {
  id: string;
  content: string;
  user: GlobalUser;
  children: ProductComment[]
}