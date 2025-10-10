'use client';

import React, { useState } from 'react';
import { IconPlus, IconClock, IconMapPin, IconPhone, IconCheck } from '@tabler/icons-react';
import {
    Accordion,
    ActionIcon,
    Badge,
    Button,
    Card,
    Flex,
    Group,
    Paper,
    SegmentedControl,
    Text,
    Title,
    useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from './Orders.module.css'; // Assuming a CSS module for custom styling
import OrderItem from './OrderItem/OrderItem';
import OrderNavCard from './OrderNavCard/OrderNavCard';
import OrderDescriptionCard from './OrderDescriptionCard/OrderDescriptionCard';

const sampleOders = [
  {
    id: '00349',
    status: 'New',
    total: 99.60,
    time: '00h: 25m: 30s',
    address: 'Lincoln Street 45',
    customer: 'Austin Paul',
    phone: '+424 56778912',
    items: [
      { name: 'Fruity pancakes', quantity: 2, addOn: 'maple syrup', price: 18.50 },
      { name: 'Rice with wok vegetables', quantity: 1, addOn: 'teriyaki sauce', price: 14.07 },
      { name: 'Pasta carbonara', quantity: 5, addOn: 'double parmesan', price: 50.00 },
      { name: 'Spring salad', quantity: 1, price: 18.10 },
    ],
  },
  {
    id: '00350',
    status: 'In Progress',
    total: 76.30,
    time: '00h: 15m: 42s',
    address: 'Maple Avenue 22',
    customer: 'Sophia Green',
    phone: '+424 56778123',
    items: [
      { name: 'Veggie burger', quantity: 2, addOn: 'extra cheese', price: 22.00 },
      { name: 'Caesar salad', quantity: 1, price: 14.30 },
      { name: 'Iced latte', quantity: 2, price: 20.00 },
      { name: 'Chocolate muffin', quantity: 2, price: 20.00 },
    ],
  },
  {
    id: '00351',
    status: 'Delivered',
    total: 54.90,
    time: '01h: 10m: 10s',
    address: 'Elm Street 19',
    customer: 'Daniel Clark',
    phone: '+424 56778256',
    items: [
      { name: 'Margherita pizza', quantity: 1, price: 18.90 },
      { name: 'Garlic bread', quantity: 2, price: 14.00 },
      { name: 'Lemonade', quantity: 2, price: 22.00 },
    ],
  },
  {
    id: '00352',
    status: 'Cancelled',
    total: 32.75,
    time: '00h: 08m: 50s',
    address: 'Oak Lane 9',
    customer: 'Emily Johnson',
    phone: '+424 56778456',
    items: [
      { name: 'Avocado toast', quantity: 1, price: 12.75 },
      { name: 'Cappuccino', quantity: 2, addOn: 'almond milk', price: 20.00 },
    ],
  },
  {
    id: '00353',
    status: 'New',
    total: 88.40,
    time: '00h: 33m: 12s',
    address: 'Willow Road 63',
    customer: 'Michael Lee',
    phone: '+424 56778567',
    items: [
      { name: 'Grilled chicken wrap', quantity: 3, price: 36.00 },
      { name: 'Fresh orange juice', quantity: 2, price: 18.40 },
      { name: 'Greek salad', quantity: 2, addOn: 'extra olives', price: 34.00 },
    ],
  },
];


const Orders = () => {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const [activeTab, setActiveTab] = useState('All');
    const [orders] = useState(sampleOders);
    const [activeOrderId, setActiveOrderId] = useState(orders[0].id)


    const activeOrder = orders.find((order) => order.id === activeOrderId);

    const handleAcceptOrder = () => {
        // Logic to accept order
        console.log(`Order ${activeOrder?.id} accepted`);
    };

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
                <Card
                    withBorder
                    radius="md"
                    p="xs"
                    w={{ base: '100%', sm: "auto" }}
                    bg="light-dark(var(--mantine-color-gray-0), rgba(0, 0, 0, .3))"
                >
                    <Group justify="space-between" mb="sm">
                        <Title order={4} c="white">Task list</Title>
                        <ActionIcon variant="transparent" color="blue" aria-label="Add new order">
                            <IconPlus size={18} />
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
                        orders.map((order) => <OrderNavCard {...order} setActiveOrder={setActiveOrderId} activeOrderId={activeOrderId} key={order.id}/>)
                    }
                </Card>

                {/* Order Details */}
                {activeOrder && (
                   <OrderDescriptionCard orders={orders} activeOrder={activeOrder} activeTab={activeTab} />
                )}
            </Flex>
        </Paper>
    );
};

export default Orders;