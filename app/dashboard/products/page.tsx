import React from 'react';
import Link from 'next/link';
import { IconCirclePlusFilled } from '@tabler/icons-react';
import { Button, Group, Text } from '@mantine/core';
import { ProductsTable } from '../../../components/Products/Products';
import SimpleRoute from '../../../components/SimpleRoute/SimpleRoute';
import { Product, ShopWithProducts } from '../../../lib/@types/shop';
import get from '../../../utils/fetch';

const Page = async () => {
  const shop = await get<ShopWithProducts>('shops/myshop');
  return (
    <div>
      <SimpleRoute tag="All Products" main="Products" />
      {!shop && (
        <>
          <Group justify="space-between">
            <Text>No Products Yet</Text>
            <Link href="/products/create">
              <Button
                variant="default"
                mx="sm"
                leftSection={<IconCirclePlusFilled color="teal" />}
              >
                New Product
              </Button>
            </Link>
          </Group>
        </>
      )}
      {shop && <ProductsTable products={shop.products} />}
    </div>
  );
};

export default Page;
