'use client';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardSection,
  Container,
  Divider,
  Flex,
  Grid,
  GridCol,
  Group,
  Input,
  InputWrapper,
  Paper,
  rem,
  Text,
  Title
} from '@mantine/core';
import classes from './Cart.module.css';
import { CartTable } from './CartTable/CartTable';
import { CartItem } from '@/lib/@types/shop';
import { IconEyeDollar } from '@tabler/icons-react';
import { useState } from 'react';
import SimpleHeader from '@/components/SimpleHeader/SimpleHeader';
import { notifications } from '@mantine/notifications';
import { datasource } from '@/lib/common/datasource';
import OrderTable from './OrderTable/OrderTable';

const CartComponent = ({ cartItems }: { cartItems: CartItem[] }) => {
  const [cartedItems, setCartItems] = useState(cartItems);
  const [selection, setSelection] = useState<string[]>([]);
  const [phone, setPhone] = useState('')
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('')

  const handleCheckout = async () => {
    setError('')
    try {
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
    if (selection.length < 1 && phone.length === 10) {
      notifications.show({
        title: "Error",
        message: "Select Items to Checkout or Check the phone",
        color: "red.7",
      })
      return;
    }


    const { data, error } = await datasource.post({ formData: { cartIds: selection, phone }, path: 'orders' })
    if (error) {
      setError(error)
    }
    console.log(data)
  }

  if (!cartedItems) return <>
    <SimpleHeader />
    <Text>No Items</Text></>

  return (
    <Paper className={classes.main}>
      <Container size="xl">
        <Grid
          h={'100%'}
          className={classes.flex}
          py="md"
        >
          <GridCol span={{ base: 12, md: 6, lg: 8 }}>

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
          </GridCol>
          <GridCol span={{ base: 12, md: 6, lg: 4 }}>

            <Card
              className={classes.box}
              shadow='lg'
              withBorder
              h="100%"
            >
              <CardSection p="md">
                <Title size="xl" ta="center">Order Summary</Title>
              </CardSection>
              <Group justify="space-between" p={'md'}>
                <Text ff={'serif'} fz="h2">Total</Text>{' '}
                <Text ff={'serif'} fz="h2">Ksh {total}/=</Text>
              </Group>
              <InputWrapper label={'Phone'} size="xl" required p={'md'} ff={'serif'} error={error}>
                <Input placeholder="0742075647" size="lg" value={phone} onChange={(e) => setPhone(e.target.value)} ff={'serif'} />
              </InputWrapper>
              <Group p={'md'} justify="center">
                <Button
                  color="coco.4"
                  w={'100%'}
                  ff={'serif'}
                  fullWidth
                  onClick={handleCheckout}
                  size='lg'
                  leftSection={<IconEyeDollar style={{ height: rem(24), width: rem(24) }} />}
                >
                  CheckOut
                </Button>
              </Group>
            </Card>
          </GridCol>
        </Grid>
        <Divider my="xl"/>
        <Title ta="center" py="md">Orders</Title>
        <OrderTable />
      </Container>
    </Paper>
  );
};


// {selection.map((item, idx) => {

//   const cart = cartedItems.find((itm) => itm.id === item)

//   return (
//     <Group key={idx} mb="sm" justify='space-between' className={classes.sumBtn} pr="md">
//       <Avatar size={100} radius={0} src={cart?.product.images[0].signedUrl} name={cart?.product.name} />
//       <Text fz="h2">{cart?.quantity}</Text>
//       <Text fz="h2">{cart ? cart?.size.price * cart?.quantity : ''}/=</Text>
//     </Group>
//   )

// })}
export default CartComponent;
