import React from 'react';
import { redirect } from 'next/navigation';
import EditProduct from '../../../../../../components/EditProduct/EditProduct';
import { Product } from '../../../../../../lib/@types/shop';
import get from '../../../../../../utils/fetch';
import { Category } from '../../../../../../lib/@types/category';

async function Page({ params }: { params: { id: number } }) {
  const product = await get<Product>(`products/edit/${params.id}`);
  const categories = await get<Category[]>('categories');
  if (!product || !categories) redirect('/dashboard/products');
  return (
    <div>
      <EditProduct productEdit={product} categories={categories} />
    </div>
  );
}

export default Page;
