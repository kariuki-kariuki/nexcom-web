import cx from 'clsx';
import { useState } from 'react';
import {
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Text,
  rem,
  Image,
  Paper,
} from '@mantine/core';
import classes from './CartTable.module.css';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { Order } from '../../../../@types/shop';

const data = [
  {
    id: '1',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
    name: 'Robert Wolfkisser',
    job: 'Engineer',
    email: 'rob_wolf@gmail.com',
  },
  {
    id: '2',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
    name: 'Jill Jailbreaker',
    job: 'Engineer',
    email: 'jj@breaker.com',
  },
  {
    id: '3',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    name: 'Henry Silkeater',
    job: 'Designer',
    email: 'henry@silkeater.io',
  },
  {
    id: '4',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
    name: 'Bill Horsefighter',
    job: 'Designer',
    email: 'bhorsefighter@gmail.com',
  },
  {
    id: '5',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png',
    name: 'Jeremy Footviewer',
    job: 'Manager',
    email: 'jeremy@foot.dev',
  },
];

export function CartTable({ orders }: { orders: Order[] | null }) {
  const [selection, setSelection] = useState([orders?.[0].id.toString()]);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data?.map((item) => item?.id),
    );

  const rows = orders?.map((order) => {
    const selected = selection.includes(order?.id.toString());
    const [myOrders, setOrders] = useState(order);
    return (
      <Table.Tr
        key={order?.id}
        className={cx({
          [classes.rowSelected]: selected,
          [classes.color]: !selected,
        })}
      >
        <Table.Td>
          <Checkbox
            checked={selection.includes(order.id.toString())}
            onChange={() => toggleRow(order.id.toString())}
          />
        </Table.Td>
        <Table.Td>
          <Group gap="sm" h={70}>
            <Image
              style={{ height: '100%' }}
              src={order.product.images[0]}
              radius={'md'}
            />
            <Text size="sm" fw={500}>
              {order.product.name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>
          <Group>
            <IconMinus
              color="red"
              onClick={() => {
                if (myOrders.quantity > 1) {
                  setOrders((prev: Order) => ({
                    ...prev,
                    quantity: prev.quantity - 1,
                  }));
                }
              }}
            />
            {myOrders.quantity}
            <IconPlus
              color="green"
              onClick={() => {
                setOrders((prev: Order) => ({
                  ...prev,
                  quantity: prev.quantity + 1,
                }));
              }}
            />
          </Group>
        </Table.Td>
        <Table.Td>{myOrders.quantity * order.product.price}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Paper className={classes.main}>
      <ScrollArea>
        <Table
          miw={0}
          verticalSpacing="sm"
          withRowBorders={false}
          stickyHeader
          // stickyHeaderOffset={60}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: rem(40) }}>
                <Checkbox
                  onChange={toggleAll}
                  checked={selection.length === data.length}
                  indeterminate={
                    selection.length > 0 && selection.length !== data.length
                  }
                />
              </Table.Th>
              <Table.Th>Product Name</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Total</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}
