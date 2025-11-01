import { Container, Flex, Text, Title } from '@mantine/core'
import { ProductResultType } from '@repo/nexcom-types'
import React from 'react'
import ProductCard from '../Shop/Products/ProductCard'

interface HeroProductsProps {
    productsResults: ProductResultType
}
const HeroProducts = ({ productsResults }: HeroProductsProps) => {
    return (
        <Container size="xl" py="xl" mih="100vh">
            <Title c="coco.5">Shop Like A Pro</Title>
            <Text>Browse from Thousands of our products</Text>

            <Flex gap='sm' my="xl" wrap="wrap">
                {productsResults.products.map((product) => <ProductCard product={product} key={product.id} />)}
            </Flex>
        </Container>
    )
}

export default HeroProducts