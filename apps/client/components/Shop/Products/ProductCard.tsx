'use client';
import {
  Card,
  Group,
  Text,
  useMantineTheme,
  Box,
  Stack,
  Flex,
  Avatar
} from '@mantine/core';
import { Product, ProductWithShop, ShopProduct } from '@/lib/@types/shop';
import classes from './ProductCard.module.css';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';
import ProductRating from '../ProductRating/ProductRating';
import {MotionWrapper} from '@/components/ui/MotionWrapper';
interface Iprops {
  product: ProductWithShop | ShopProduct | Product;
}

function ProductCard({ product }: Iprops) {

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return (
    <MotionWrapper className={classes.card} direction='up' duration={1}>
      <Card p={0}>
        <Link href={`/business/product/${product.id}`} className={classes.link}>
          <Flex direction={{ base: 'row', sm: 'column' }}>
            <Box w={{ base: '30%', sm: '100%' }}>
              <Avatar radius={0} src={product.images[0]?.signedUrl} className={classes.image} name={product.name} />
            </Box>
            <Stack align='center' justify='space-around' className={classes.info} gap={2} p="sm" w={{ base: '70%', sm: '100%' }}>
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
    </MotionWrapper>
  );
}

export default ProductCard;
