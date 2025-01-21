'use client';

import { Flex, Grid, ScrollArea } from '@mantine/core';
import ProductCard from './ProductCard';
import { CategoryWithProducts } from '@/lib/@types/shop';
import classes from './hero.module.css';
import { HeaderSearch } from '@/components/HeaderSearch/HeaderSearch';

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

            <p className='font-sans text-2xl font-semibold p-2'>{category.name}</p>
            <Grid p={0} gutter={'xs'}>
              {category.products?.map((product) => <ProductCard product={product} key={product.id}/>) }
            </Grid>

          </div>))}
      </ScrollArea>
     
    </Flex>
  );
}

export default HeroPage;
