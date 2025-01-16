'use client';

import HeroPage from './Products/HeroPage';
import { Box, LoadingOverlay, Paper } from '@mantine/core';
import { NavbarNested } from './ShopNav/NavbarNested';
import classes from './Shop.module.css';
import useFetch from '@/lib/bhooks/useFetchHooks';
import { useState } from 'react';
import { ProductWithShop } from '@/lib/@types/shop';

function Shop() {
  const { isLoading, response } = useFetch<ProductWithShop[]>('products');
  const [filterr, setFilter] = useState<string>('all');
  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'coco.0', type: 'bars' }}
      />
      <Box className={classes.shop}>
        <Box className={classes.sections} bg={'none'}>
          <Paper
            w={{ sm: '30%', md: '25%' }}
            visibleFrom="sm"
            p={0}
            bg={'none'}
          >
            <NavbarNested filter={filterr} setFilter={setFilter} />
          </Paper>
          <Paper w={{ base: '100%', sm: '70%', md: '75%' }} p={0} bg={'none'}>
            {response ? <HeroPage products={response} /> : ''}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default Shop;
