import React from 'react';
import Link from 'next/link';
import { IconCirclePlusFilled } from '@tabler/icons-react';
import { Button, Container, Group, Text } from '@mantine/core';
import { ProductsTable } from '../../../../components/Products/Products';
import { Product, ShopWithProducts } from '../../../../lib/@types/shop';
import get from '../../../../utils/fetch';

const Page = async () => {
  const shop = await get<ShopWithProducts>('shops/myshop');
  return (
    <div>
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
      <Container size="xl">
        {shop && <ProductsTable products={shop.products} />}
      </Container>
    </div>
  );
};

export default Page;
