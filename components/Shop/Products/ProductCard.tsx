'use client';
import {
  Card,
  Grid,
  Group,
  Text,
  Button,
  Image,
  rem,
  useMantineTheme,
  Box
} from '@mantine/core';
import { ProductWithShop } from '@/lib/@types/shop';
import classes from './ProductCard.module.css';
import { IconShoppingCartPlus, IconStar } from '@tabler/icons-react';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
interface Iprops {
  product: ProductWithShop;
}

function ProductCard({ product }: Iprops) {

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return (
    <Grid.Col span={{ base: 6, sm: 6, lg: 3 }} p={{ base: 'none', sm: 'sm' }}>
      <Card className={classes.card} p={0}>
        <Box h={{base: 200, sm: 200}}>
          <Image src={product.images[0].url} h={'100%'}/>
        </Box>
        <Group justify="space-between" bg="gray.2" py="lg" px="lg" wrap="nowrap">
          <Text
            fw={{ base: 200, sm: 500 }}
            fz={{ base: 'xs', sm: 'lg' }}
            lineClamp={1}
            c="coco.0"
            flex={1}
          >
            {product.name}
          </Text>

          <Group gap={mobile ? 3 : 'lg'} wrap="nowrap">
            <Text
              fz={{ base: 'sm', sm: 'lg' }}
              span
              fw={500}
              flex={1}
              className={classes.price}
            >
              Ksh{' '}
              {product.product_sizes[0].price > 1000
                ? `${(product.product_sizes[0].price / 1000).toFixed(0)}k`
                : product.product_sizes[0].price}
            </Text>
          </Group>
        </Group>
      </Card>
    </Grid.Col>
  );
}

export default ProductCard;
