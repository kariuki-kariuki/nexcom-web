import React from 'react';
import { redirect } from 'next/navigation';
import { get } from '@repo/shared-logic';
import { Category, Product } from '@repo/nexcom-types';
import EditProduct from '@/components/EditProduct/EditProduct';

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
