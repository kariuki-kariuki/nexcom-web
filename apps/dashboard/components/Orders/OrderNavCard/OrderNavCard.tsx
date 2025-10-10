import { Card, Flex, Group, Text, Title } from '@mantine/core'
import React from 'react'
import classes from "./OrderNavCard.module.css";
import { usePathname } from 'next/navigation';

interface OrderItemProp {
    total: number,
    status: string,
    time: string,
    id: string,
    setActiveOrder: (id: string) => void
    activeOrderId: string,
}

const OrderNavCard = ({ total, status, time, id, setActiveOrder, activeOrderId }: OrderItemProp) => {
    const isActive = activeOrderId === id;
    return (
        <Card mt="sm"
         withBorder
         radius="md" 
         className={classes.card} 
         onClick={() => setActiveOrder(id)}
         data-active={isActive || undefined}
        >
            <Group justify="space-between" py="xs">
                <Flex gap="xs" align="center">
                    <div>
                        <Title size="lg" fw={700}>Order #{id}</Title>
                        <Text size="xs" c="dimmed">x{time}</Text>
                    </div>
                </Flex>
                <Text size="sm">€{total.toFixed(2)}</Text>
            </Group>
        </Card>
    )
}

export default OrderNavCard