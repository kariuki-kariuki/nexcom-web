import Cart from '@/components/Shop/Cart/Cart'
import React from 'react'
import get from '@/utils/fetch'
import { CartItem } from '@/lib/@types/shop';
import { Flex, Text } from '@mantine/core';
import EmptyState from '@/components/EmptyState/EmptyState';
import { IconSearchOff } from '@tabler/icons-react';
import SimpleRoute from '@/components/SimpleRoute/SimpleRoute';

const Page = async () => {
  const res = await get<CartItem[]>('carts');
  if (!res || res.length < 1) return <EmptyState icon={<IconSearchOff size={54} />} message='No Items In cart' actionText='Shop Now' actionUrl='/business/product' />
  return (
    <Flex direction={'column'} h="100%">
      <SimpleRoute />
      <Cart cartItems={res} />
    </Flex>

  )
}

export default Page