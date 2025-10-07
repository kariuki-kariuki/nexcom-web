import React from 'react';
import Link from 'next/link';
import { IconCirclePlusFilled } from '@tabler/icons-react';
import { Button, Group, Text } from '@mantine/core';
import { get } from '@repo/shared-logic';
import { Product } from '@repo/nexcom-types';
import { ProductsTable } from '@/components/Products/ProductsTable';

const Page = async () => {
  const products = await get<Product[]>('shops/myshop');
  return (
    <div>
      {!products && (
        <>
          <Group justify="space-between">
            <Text>No Products Yet</Text>
            <Link href="/dashboard/products/create">
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
      {products && <ProductsTable products={products} />}
    </div>
  );
};

export default Page;
