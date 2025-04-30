'use client'
import { useState } from 'react';
import { Box, Flex } from '@mantine/core';
import { StatsGrid } from './components/StatsGrid/StatsGrid';
import Header from './components/Header/Header';
import classes from './Admin.module.css';
import { ProductsTable } from '../Products/Products';
import { Product } from '@/lib/@types/shop';

interface IPros {
  products: Product[]
}
function Admin({products}: IPros) {
  const [active, setActive] = useState(false);
  return (
    <Box h={'100vh'} className={classes.admin}>
      <Flex
        h={'100%'}
        direction={'column'}
        className={classes.flex}
      >
        <Header active={active} setActive={setActive} />
        <div className={classes.scroll}>
          <StatsGrid />
          <ProductsTable products={products}/>
        </div>
      </Flex>
    </Box>
  );
}

export default Admin;
