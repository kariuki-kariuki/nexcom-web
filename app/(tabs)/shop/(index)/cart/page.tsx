import Cart from '@/components/Shop/Cart/Cart'
import { Order } from '@/lib/@types/shop'
import { datasource } from '@/lib/common/datasource'
import React from 'react'

const Page = async () => {
  const { data } =await datasource.get<Order[]>('/orders');
  return (
    <Cart orderss={data}/>
  )
}

export default Page