import {
  Box,
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
import MenuDrop from '../../../Index/MenuDrop';
import { IconEyeDollar } from '@tabler/icons-react';
// import mpesa from '../../../assets/mpesa.png';
const links = [
  { link: '/', label: 'Home' },
  { link: '/chat', label: 'Chat' },
  { link: '/shop', label: 'Shop' },
];
const Cart = () => {
  const { result } = useFetch<Order[] | null>('orders');
  console.log(result);
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
          radius={'md'}
          className={classes.card}
        >
          <HeaderSearch links={links} />

          {result && result.length > 0 ? <CartTable orders={result} /> : ''}
        </Card>
        <Box visibleFrom="sm" w={{ base: '100%', sm: '30%' }} h={'100%'}>
          <Flex
            h={'100%'}
            className={classes.card}
            align={'center'}
            justify={'center'}
          >
            <Paper className={classes.inner_card} shadow="md" p={'lg'}>
              <MenuDrop />
              <Group justify="space-between" p={'md'} w={'fit-content'}>
                <Text>Total</Text> <Text>$200</Text>
              </Group>
              <InputWrapper label={'Phone'} required p={'md'}>
                <Input placeholder="+254 742075647" />
              </InputWrapper>
              <Group p={'md'} justify="center">
                <Button
                  color="green"
                  w={'100%'}
                  leftSection={<IconEyeDollar size={14} />}
                >
                  CheckOut
                </Button>
              </Group>
            </Paper>
          </Flex>
        </Box>
      </Flex>
    </Paper>
  );
};

export default Cart;
