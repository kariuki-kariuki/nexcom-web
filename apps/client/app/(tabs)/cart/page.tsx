import Cart from '@/components/Shop/Cart/Cart'
import React from 'react'
import get from '@/utils/fetch'
import { CartItem } from '@/lib/@types/shop';
import { Flex } from '@mantine/core';
import SimpleRoute from '@/components/SimpleRoute/SimpleRoute';

const Page = async () => {
  const res = await get<CartItem[]>('carts');
  return (
    <Flex direction={'column'} h="100%">
      <SimpleRoute />
      <Cart cartItems={res} />
    </Flex>

  )
}

export default Page