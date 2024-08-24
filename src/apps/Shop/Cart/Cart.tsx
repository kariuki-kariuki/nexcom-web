import {
  Button,
  Card,
  Flex,
  Grid,
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
const Cart = () => {
  const { result } = useFetch<Order[] | null>('orders');
  console.log(result);
  return (
    <Paper className={classes.main}>
      <HeaderSearch />
      <Grid style={{ overflow: 'hidden' }}>
        <Grid.Col span={8}>
          {result ? <CartTable orders={result} /> : ''}
        </Grid.Col>
        <Grid.Col span={4} px={3}>
          <Card h={'100%'} className={classes.card} withBorder shadow="md">
            <Flex
              direction={'column'}
              justify={'center'}
              align={'center'}
              h={'100%'}
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
          </Card>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default Cart;
