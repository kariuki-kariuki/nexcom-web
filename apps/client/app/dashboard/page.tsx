import Admin from '@/components/Admin/Admin'
import { ShopWithProducts } from '@/lib/@types/shop';
import get from '@/utils/fetch';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    const shop = await get<ShopWithProducts>('shops/myshop');
  if(!shop) redirect('/chat')
  return (
    <Admin products={shop.products}/>
  )
}

export default page