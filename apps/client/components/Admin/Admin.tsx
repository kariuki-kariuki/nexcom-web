'use client'
import { useState } from 'react';
import { Box, Container, Flex, Paper } from '@mantine/core';
import { StatsGrid } from './components/StatsGrid/StatsGrid';
import Header from './components/Header/Header';
import classes from './Admin.module.css';
import { ProductsTable } from '../Products/ProductsTable';
import { Product } from '@/lib/@types/shop';
import ProductAnalyticsTable from '../Products/ProductAnalyticsTable/ProductAnalyticsTable';

interface IPros {
  products: Product[]
}
function Admin({products}: IPros) {
  const [active, setActive] = useState(false);
  return (
      <Paper bg="none"
      >
        <Header active={active} setActive={setActive} />
          <StatsGrid products={products} />
          <ProductAnalyticsTable products={products}/>
      </Paper>
  );
}

export default Admin;
