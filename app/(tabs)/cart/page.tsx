import Cart from '@/components/Shop/Cart/Cart'
import React from 'react'
import get from '@/utils/fetch'
import { CartItem } from '@/lib/@types/shop';
import { Text } from '@mantine/core';

const Page = async () => {
  const res = await get<CartItem[]>('carts');
  if(!res) return <div><Text p="md" ta="center">No Item in Cart Try Refershing</Text></div> 
  return (
    <Cart cartItems={res}/>
  )
}

export default Page