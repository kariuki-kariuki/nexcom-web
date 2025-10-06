'use client'
import { Container, Paper } from '@mantine/core';
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
      <Container size="lg" bg="none"
      >
        {/* <Header name={name}/> */}
          <StatsGrid products={products} />
          <ProductAnalyticsTable products={products}/>
      </Container>
  );
}

export default Admin;
