'use client';

import {
  Box,
  Button,
  Card,
  Flex,
  Group,
  Input,
  InputWrapper,
  Paper,
  rem,
  Text
} from '@mantine/core';
import classes from './Cart.module.css';
import { CartTable } from './CartTable/CartTable';
import { Order } from '@/lib/@types/shop';
import { IconEyeDollar } from '@tabler/icons-react';
import { useState } from 'react';
import SimpleHeader from '@/components/SimpleHeader/SimpleHeader';

const Cart = ({ orderss }: { orderss: Order[] | null }) => {
  const [orders, setOrders] = useState(orderss);
  const [total, setTotal] = useState(0);

  if (!orders) return <>
    <SimpleHeader />
    <Text>No Items</Text></>

  return (
    <Paper className={classes.main} h={'100vh'}>
      <SimpleHeader />
      <Flex
        h={'100%'}
        className={classes.flex}
        direction={{ base: 'column', sm: 'row' }}
        gap={'md'}
        p="md"
      >
        <Box
          w={{ base: '100%', sm: '70%' }}
        >
          {orders.length > 0 ? (
            <CartTable
              orders={orders}
              setTotal={setTotal}
              setOrders={setOrders}
            />
          ) : (
            ''
          )}
        </Box>
        <Card
          w={{ base: '100%', sm: '30%' }}
          className={classes.box}
          h="fit-content"
          shadow='lg'
        >
          <Group justify="space-between" p={'md'} w={'fit-content'}>
            <Text ff={'serif'} fz="bold">Total</Text>{' '}
            <Text ff={'serif'}>Ksh {total}</Text>
          </Group>
          <InputWrapper label={'Phone'} required p={'md'} ff={'serif'}>
            <Input placeholder="+254 742075647" size='lg' ff={'serif'} />
          </InputWrapper>
          <Group p={'md'} justify="center">
            <Button
              color="coco.4"
              w={'100%'}
              ff={'serif'}
              fullWidth
              size='lg'
              leftSection={<IconEyeDollar style={{ height: rem(24), width: rem(24) }} />}
            >
              CheckOut
            </Button>
          </Group>
        </Card>
      </Flex>
    </Paper>
  );
};

export default Cart;
