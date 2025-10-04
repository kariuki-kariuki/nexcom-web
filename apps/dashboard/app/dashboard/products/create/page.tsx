import NewProduct from '@/components/NewProduct/NewProduct';
import { Category } from '@repo/nexcom-types';
import { get } from '@repo/shared-logic';
import React from 'react';

const CreateNewProduct = async () => {
  const categories = await get<Category[]>('categories');
  return <NewProduct categoriesdb={categories} />;
};

export default CreateNewProduct;
