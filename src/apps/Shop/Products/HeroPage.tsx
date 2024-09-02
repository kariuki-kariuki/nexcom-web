import { Grid, Paper, ScrollArea } from '@mantine/core';
import ProductCard from './ProductCard';
import { ProductWithShop } from '../../../@types/shop';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import ProductModal from './ProductModal';
import classes from './hero.module.css';

interface Iprop {
  products: ProductWithShop[];
}
function HeroPage({ products }: Iprop) {
  const [opened, { toggle }] = useDisclosure(false);
  const [viewing, setVeiwing] = useState<ProductWithShop>(products?.[0]);
  const product = products?.map((product: ProductWithShop, index) => (
    <ProductCard
      product={product}
      setViewing={setVeiwing}
      toggle={toggle}
      key={index}
    />
  ));

  return (
    <Paper bg={'none'} className={classes.hero} pl={{ sm: 'md' }}>
      <ScrollArea className={classes.scroll} scrollbars="y">
        <Grid p={0} gutter={'xs'}>
          {product}
        </Grid>
      </ScrollArea>
      <ProductModal
        opened={opened}
        toggle={toggle}
        product={viewing}
        shopId={viewing?.shop.id}
      />
    </Paper>
  );
}

export default HeroPage;
