import React from 'react'
import get from '@/utils/fetch'
import { CartItem } from '@/lib/@types/shop';
import { Flex } from '@mantine/core';
import SimpleRoute from '@/components/SimpleRoute/SimpleRoute';
import CartComponent from '@/components/Shop/Cart/Cart';

const Page = async () => {
  const res = await get<CartItem[]>('carts');
  return (
    <Flex direction={'column'} h="100%">
      <SimpleRoute />
      <CartComponent cartItems={res} />
    </Flex>

  )
}

export default Page