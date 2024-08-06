import { Grid, Paper, ScrollArea } from '@mantine/core';
import ProductCard from './ProductCard';
import { IProduct } from '../../../@types/shop';
import { GetProducts } from '../../../data/shop';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import ProductModal from './ProductModal';
import classes from './hero.module.css';

function HeroPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const MockProducts = GetProducts();
  const [viewing, setVeiwing] = useState<IProduct>(MockProducts[0]);
  const products = MockProducts?.map((product: IProduct, index) => (
    <ProductCard
      product={product}
      setViewing={setVeiwing}
      open={open}
      key={index}
    />
  ));

  return (
    <Paper bg={'black'} className={classes.hero}>
      <ScrollArea className={classes.scroll} scrollbars="y">
        <Grid p={0} gutter={'xs'}>
          {products}
        </Grid>
      </ScrollArea>
      <ProductModal opened={opened} close={close} product={viewing} />
    </Paper>
  );
}

export default HeroPage;
