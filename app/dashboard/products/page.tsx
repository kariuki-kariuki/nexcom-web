import React from 'react';
import Link from 'next/link';
import { IconCirclePlusFilled } from '@tabler/icons-react';
import { Button, Group, Text } from '@mantine/core';
import { Products } from '../../../components/Products/Products';
import SimpleRoute from '../../../components/SimpleRoute/SimpleRoute';
import { Product } from '../../../lib/@types/shop';
import get from '../../../utils/fetch';

const Page = async () => {
  const products = await get<Product[]>('products');
  return (
    <div>
      <SimpleRoute tag="All Products" main="Products" />
      {!products && (
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
      {products && <Products products={products} />}
    </div>
  );
};

export default Page;
