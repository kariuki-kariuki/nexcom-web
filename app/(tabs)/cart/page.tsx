import Cart from '@/components/Shop/Cart/Cart'
import { Order } from '@/lib/@types/shop'
import React from 'react'
import get from '@/utils/fetch'

const Page = async () => {
  const res = await get<Order[]>('orders');
  return (
    <Cart orderss={res}/>
  )
}

export default Page