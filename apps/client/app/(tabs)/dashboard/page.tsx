import Admin from '@/components/Admin/Admin'
import { Product, ShopWithProducts } from '@/lib/@types/shop';
import get from '@/utils/fetch';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    const products = await get<Product[]>('shops/myshop');
  if(!products) redirect('/chat')
  return (
    <Admin products={products}/>
  )
}

export default page