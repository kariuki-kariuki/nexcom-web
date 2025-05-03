import Cart from '@/components/Shop/Cart/Cart'
import React from 'react'
import get from '@/utils/fetch'
import { CartItem } from '@/lib/@types/shop';
import { Text } from '@mantine/core';
import EmptyState from '@/components/EmptyState/EmptyState';
import { IconSearchOff } from '@tabler/icons-react';

const Page = async () => {
  const res = await get<CartItem[]>('carts');
  if(!res || res.length < 1) return <EmptyState icon={<IconSearchOff size={54} /> } message='No Items In cart' actionText='Shop Now' actionUrl='/business/product'/> 
  return (
    <Cart cartItems={res}/>
  )
}

export default Page