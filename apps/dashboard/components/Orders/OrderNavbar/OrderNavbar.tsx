'use client'
import { ActionIcon, Card, Group, SegmentedControl, Title, useMantineTheme } from '@mantine/core'
import { IconListDetails, IconPlus } from '@tabler/icons-react'
import React, { useState } from 'react'
import OrderNavCard from '../OrderNavCard/OrderNavCard'
import { useMediaQuery } from '@mantine/hooks'
import { sampleOders } from '../Orders'
import classes from "./OrderNavbar.module.css"
import { usePathname } from 'next/navigation'

const OrderNavbar = () => {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const [activeTab, setActiveTab] = useState('All');
    const [orders] = useState(sampleOders);
    const [activeOrderId, setActiveOrderId] = useState(orders[0].id)
    return (
        <Card
            withBorder
            radius="md"
            p="xs"
            w={{ base: '100%', sm: "auto" }}
            bg="light-dark(var(--mantine-color-gray-0), rgba(0, 0, 0, .3))"
        >
            <Group justify="space-between" mb="sm">
                <Title order={4}>Order list</Title>
                <ActionIcon variant="transparent" color="blue" aria-label="Add new order">
                    <IconListDetails size={18} />
                </ActionIcon>
            </Group>
            <SegmentedControl
                radius="xl"
                size={mobile ? 'xs' : 'md'}
                data={['All', 'Published', 'Draft', 'Archived']}
                value={activeTab}
                onChange={setActiveTab}
                classNames={classes}
                aria-label="Filter jobs by status"
                color="teal"
                transitionDuration={200}
                transitionTimingFunction="ease"
            />
            {
                orders.map((order) => <OrderNavCard {...order} key={order.id}/>)
            }
        </Card>
    )
}

export default OrderNavbar