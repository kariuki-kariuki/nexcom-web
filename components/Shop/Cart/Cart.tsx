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
import { CartItem } from '@/lib/@types/shop';
import { IconEyeDollar } from '@tabler/icons-react';
import { useState } from 'react';
import SimpleHeader from '@/components/SimpleHeader/SimpleHeader';
import { notifications } from '@mantine/notifications';
import { datasource } from '@/lib/common/datasource';

const CartComponent = ({ cartItems }: { cartItems: CartItem[] }) => {
  const [cartedItems, setCartItems] = useState(cartItems);
  const [selection, setSelection] = useState<string[]>([]);
  const [phone, setPhone] = useState('')
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('')

  const handleCheckout = async () => {
    setError('')
    try{
      let num = parseInt(phone)
      console.log(num);
    } catch (e) {
      notifications.show({
        title: "Error",
        message: "Check the phone number.",
        color: "red.7",
      })
      return;
    }
    if (selection.length < 1 && phone.length < 10) {
      notifications.show({
        title: "Error",
        message: "Select Items to Checkout or Check the phone",
        color: "red.7",
      })
      return;
    }


    const { data, error } = await datasource.post({ formData: { cartIds: selection, phone: parseInt(phone) }, path: 'orders' })
    if(error){
      setError(error)
    }
    console.log(data)
  }

  if (!cartedItems) return <>
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
          {cartedItems.length > 0 ? (
            <CartTable
              cartItems={cartedItems}
              setTotal={setTotal}
              setCartItems={setCartItems}
              selection={selection}
              setSelection={setSelection}
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
          <InputWrapper label={'Phone'} required p={'md'} ff={'serif'} error={error}>
            <Input placeholder="+254 742075647" value={phone} onChange={(e) => setPhone(e.target.value)} size='lg' ff={'serif'} />
          </InputWrapper>
          <Group p={'md'} justify="center">
            <Button
              color="coco.4"
              w={'100%'}
              ff={'serif'}
              fullWidth
              size='lg'
              onClick={handleCheckout}
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

export default CartComponent;
