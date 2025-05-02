'use client'
import { useState } from 'react';
import { Box, Container, Flex, Paper } from '@mantine/core';
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
      <Paper bg="none"
      >
        <Header active={active} setActive={setActive} />
          <StatsGrid />
          <ProductsTable products={products}/>
      </Paper>
  );
}

export default Admin;
