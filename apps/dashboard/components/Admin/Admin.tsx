'use client'
import { Paper } from '@mantine/core';
import { StatsGrid } from './components/StatsGrid/StatsGrid';
import Header from './components/Header/Header';
import ProductAnalyticsTable from '../Products/ProductAnalyticsTable/ProductAnalyticsTable';
import { Product } from '@repo/nexcom-types';

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
