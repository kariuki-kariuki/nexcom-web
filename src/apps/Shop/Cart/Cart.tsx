import {
  Button,
  Card,
  Flex,
  Group,
  Input,
  InputWrapper,
  Paper,
  Text,
} from '@mantine/core';
import classes from './Cart.module.css';
import { CartTable } from './CartTable/CartTable';
import { useFetch } from '../../../hooks/useFetchHooks';
import { Order } from '../../../@types/shop';
import { HeaderSearch } from '../../../components/Navbar/HeaderSearch/HeaderSearch';
import { IconEyeDollar } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
// import mpesa from '../../../assets/mpesa.png';
const links = [
  { link: '/', label: 'Home' },
  { link: '/chat', label: 'Chat' },
  { link: '/shop', label: 'Shop' },
];
const Cart = () => {
  const { response } = useFetch<Order[] | null>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (response) {
      setOrders(response);
    }
  }, [response]);
  return (
    <Paper className={classes.main} h={'100vh'}>
      <Flex
        h={'100%'}
        className={classes.flex}
        direction={'row'}
        justify={'center'}
        align={'center'}
        gap={'md'}
      >
        <Card
          w={{ base: '100%', sm: '70%' }}
          h={'100%'}
          className={classes.card}
          py={{ base: 'xs', sm: 'md' }}
          px={0}
          withBorder
        >
          <HeaderSearch links={links} />

          {orders.length > 0 ? (
            <CartTable
              orders={orders}
              setTotal={setTotal}
              setOrders={setOrders}
            />
          ) : (
            ''
          )}
        </Card>
        <Card
          visibleFrom="sm"
          w={{ base: '100%', sm: '30%' }}
          h={'100%'}
          withBorder
          p={0}
          radius={'lg'}
        >
          <Flex
            h={'100%'}
            className={classes.card}
            align={'center'}
            justify={'center'}
          >
            <Card
              className={classes.inner_card}
              withBorder
              shadow="md"
              p={'lg'}
            >
              <Text ta={'center'} fw={'bold'} ff={'serif'}>
                CART
              </Text>
              <Group justify="space-between" p={'md'} w={'fit-content'}>
                <Text ff={'serif'}>Total</Text>{' '}
                <Text ff={'serif'}>Ksh {total}</Text>
              </Group>
              <InputWrapper label={'Phone'} required p={'md'} ff={'serif'}>
                <Input placeholder="+254 742075647" ff={'serif'} />
              </InputWrapper>
              <Group p={'md'} justify="center">
                <Button
                  color="green"
                  w={'100%'}
                  ff={'serif'}
                  leftSection={<IconEyeDollar size={14} />}
                >
                  CheckOut
                </Button>
              </Group>
            </Card>
          </Flex>
        </Card>
      </Flex>
    </Paper>
  );
};

export default Cart;
