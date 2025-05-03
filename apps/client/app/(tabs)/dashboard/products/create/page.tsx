import React from 'react';
import NewProduct from '../../../../../components/NewProduct/NewProduct';
import get from '../../../../../utils/fetch';
import { Category } from '../../../../../lib/@types/category';

const CreateNewProduct = async () => {
  const categories = await get<Category[]>('categories');
  return <NewProduct categoriesdb={categories} />;
};

export default CreateNewProduct;
