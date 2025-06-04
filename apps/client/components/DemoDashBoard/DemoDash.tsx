import { Product } from '@/lib/@types/shop'
import React from 'react'
import Admin from '../Admin/Admin'
import { Container } from '@mantine/core'

const DemoDash = ({ products }: { products: Product[] }) => {
  return (
    <Container size="xl">
      <Admin products={products}  name ="Dashboard Management Demo" />
    </Container>
  )
}

export default DemoDash