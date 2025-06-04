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
  products: Product[],
  name?: string,
}
function Admin({products, name}: IPros) {
  return (
      <Paper bg="none"
      >
        <Header name={name}/>
          <StatsGrid products={products} />
          <ProductAnalyticsTable products={products}/>
      </Paper>
  );
}

export default Admin;
