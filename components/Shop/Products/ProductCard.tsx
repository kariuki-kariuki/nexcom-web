'use client';
import {
  Card,
  Group,
  Text,
  Image,
  useMantineTheme,
  Box,
  Stack,
  Flex
} from '@mantine/core';
import { Product, ProductWithShop, ShopProduct } from '@/lib/@types/shop';
import classes from './ProductCard.module.css';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';
import ProductRating from '../ProductRating/ProductRating';
interface Iprops {
  product: ProductWithShop | ShopProduct | Product;
}

function ProductCard({ product }: Iprops) {

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return (
    <Card className={classes.card} p={0}>
      <Link href={`/business/product/${product.id}`} className={classes.link}>
        <Flex direction={{ base: 'row', sm: 'column'}}>
          <Box w={{ base: '50%', sm: '100%'}}>
            <Image src={product.images[0]?.url} className={classes.image} />
          </Box>
          <Stack align='center' justify='space-around' className={classes.info} gap={2} p="sm" w={{ base: '50%', sm: '100%'}}>
            <Text
              fw={{ base: 200, sm: 500 }}
              fz={{ base: 'sm', sm: 'lg' }}
              lineClamp={1}
              ta="center"
            >
              {product.name}
            </Text>

            <Group gap={mobile ? 3 : 'lg'} wrap="nowrap" >
              <Text
                fz={{ base: 'sm', sm: 'lg' }}
                span
                fw={500}
                c="dimmed"
                className={classes.price}
              >
                Ksh{' '}
                {product.product_sizes[0].price > 1000
                  ? `${(product.product_sizes[0].price / 1000).toFixed(0)}k`
                  : product.product_sizes[0].price}
              </Text>
            </Group>
            <ProductRating />
          </Stack>
        </Flex>
      </Link>
    </Card>
  );
}

export default ProductCard;
