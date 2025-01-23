'use client';

import { Box, Flex, Grid, ScrollArea } from '@mantine/core';
import ProductCard from './ProductCard';
import { CategoryWithProducts } from '@/lib/@types/shop';
import classes from './hero.module.css';
import { HeaderSearch } from '@/components/HeaderSearch/HeaderSearch';
import Link from 'next/link';

interface Iprop {
  categories: CategoryWithProducts[];
  tag: string;
}
const links = [
  { link: '/', label: 'Home' },
  { link: '/chat', label: 'Chat' },
  { link: '/cart', label: 'Cart' }
];
function HeroPage({ categories }: Iprop) {
  return (
    <Flex className={classes.hero} direction={'column'}>
      <HeaderSearch links={links} />
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
