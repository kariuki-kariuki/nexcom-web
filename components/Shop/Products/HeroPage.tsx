'use client';

import { Box, Flex, Grid, ScrollArea } from '@mantine/core';
import ProductCard from './ProductCard';
import { CategoryWithProducts } from '@/lib/@types/shop';
import classes from './hero.module.css';
import SimpleHeader from '@/components/SimpleHeader/SimpleHeader';

interface Iprop {
  categories: CategoryWithProducts[];
  tag: string;
}

function HeroPage({ categories }: Iprop) {
  return (
    <Flex className={classes.hero} direction={'column'}>
      <Box visibleFrom='sm'><SimpleHeader /></Box>
      <ScrollArea className={classes.scroll} scrollbars="y">
          {categories.map((category) => (<div key={category.id}>

            <p className={classes.categoryTitle}>{category.name}</p>
            <div className={classes.flex}>
              {category.products?.map((product) => <ProductCard product={product} key={product.id} />) }
            </div>

          </div>))}
      </ScrollArea>
     
    </Flex>
  );
}

export default HeroPage;
