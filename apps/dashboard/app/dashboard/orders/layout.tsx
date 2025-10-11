import OrderDescriptionCard from '@/components/Orders/OrderDescriptionCard/OrderDescriptionCard'
import OrderNavbar from '@/components/Orders/OrderNavbar/OrderNavbar'
import { Paper, Flex } from '@mantine/core'
import React from 'react'

interface OrdersLayoutProps {
    children: React.ReactNode
} 
const OrdersLayout = ({children}: OrdersLayoutProps) => {
  return (
    <Paper
            shadow="lg"
            radius="lg"
            p={{ base: 'sm', sm: 'md', lg: 'md' }}
            bg="none"
            mx="auto"
            mt="sm"
            h="100%"
        >
            <Flex direction={{ base: 'column', sm: 'row' }} flex={1} gap="md">
                {/* Sidebar */}
                <OrderNavbar />
                {children}
            </Flex>
        </Paper>
  )
}

export default OrdersLayout