import { Card, Flex, Group, Text, Title } from '@mantine/core'
import React from 'react'
import classes from "./OrderNavCard.module.css";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface OrderItemProp {
    total: number,
    status: string,
    time: string,
    id: string,
}

const OrderNavCard = ({ total, time, id }: OrderItemProp) => {
    const path = usePathname();
    const isActive = `/dashboard/orders/${id}` === path;

    return (
        <Link href={`/dashboard/orders/${id}`}>
            <Card mt="sm"
                withBorder
                radius="md"
                className={classes.card}
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
        </Link>
    )
}

export default OrderNavCard