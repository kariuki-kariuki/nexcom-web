'use client'
import { Badge, Button, Card, Group, Text, Title } from '@mantine/core'
import { IconClock, IconMapPin, IconPhone, IconCheck } from '@tabler/icons-react'
import React from 'react'
import OrderItem from '../OrderItem/OrderItem'
import classes from "./OrderDescriptionCard.module.css"
import { useGlobalStore } from '@repo/shared-logic'
import { sampleOders } from '../Orders'

export interface OrderItemProps {
    name: string;
    quantity: number;
    addOn?: string; // optional
    price: number;
}

export interface Order {
    id: string;
    status: string;
    total: number;
    time: string;
    address: string;
    customer: string;
    phone: string;
    items: OrderItemProps[];
}

interface OrderDescriptionCardProps {
    id: string
}

const OrderDescriptionCard = ({ id }: OrderDescriptionCardProps) => {
    const user = useGlobalStore((state) => state.user)
    const activeTab = "All"
    const activeOrder = sampleOders.find((order) => id === order.id)
    return (
        <Card withBorder radius="md" p="md" flex={1} className={classes.main}>
            <Group justify="space-between" mb="md">
                <Badge color="blue" variant="light" size="lg">
                    {activeTab} {sampleOders.filter(o => o.status === activeTab).length}/4
                </Badge>
                <Text size="sm" c="dimmed">Manager - {user?.fullName}</Text>
            </Group>
            <Text fz="sm" c="dimmed">Order execution starts automatically</Text>
            <Title order={3} mt="sm">Order #{activeOrder?.id}</Title>
            <Text fw={500} c="blue">€{activeOrder?.total.toFixed(2)}</Text>

            <Group mt="md" gap="xs">
                <IconClock size={16} />
                <Text size="sm">Preparing time {activeOrder?.time}</Text>
            </Group>
            <Group mt="xs" gap="xs">
                <IconMapPin size={16} />
                <Text size="sm">Address {activeOrder?.address}</Text>
            </Group>
            <Group mt="xs" gap="xs">
                <IconPhone size={16} />
                <Text size="sm">{activeOrder?.customer}</Text>
                <Text size="sm" c="teal">{activeOrder?.phone}</Text>
            </Group>

            <Card withBorder className={classes.itemList} radius="md" p="sm" mt="md">
                {activeOrder?.items.map((item, index) => (
                    <OrderItem key={index} {...item} />
                ))}
                <Group justify="space-between" mt="md" fw={600}>
                    <Text>Total</Text>
                    <Text>€{activeOrder?.total.toFixed(2)}</Text>
                </Group>
            </Card>

            <Button
                mt="xl"
                fullWidth
                color="orange"
                radius="md"
                leftSection={<IconCheck size={22}  />}
            >
                Accept order
            </Button>
        </Card>

    )
}

export default OrderDescriptionCard