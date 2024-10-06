import cx from 'clsx';
import { useEffect, useState } from 'react';
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

interface IProps {
  orders: Order[];
  setTotal: (total: number) => void;
  setOrders: (orders: Order[]) => void;
}

export function CartTable({ orders, setTotal, setOrders }: IProps) {
  const [selection, setSelection] = useState([orders?.[0]?.id.toString()]);

  // Toggle selection of individual row
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );

  // Toggle selection of all rows
  const toggleAll = () =>
    setSelection((current) =>
      current?.length === orders.length
        ? []
        : orders?.map((item) => item.id.toString()),
    );

  // Calculate the total based on selected orders
  const calculateTotal = () => {
    const selectedOrders = orders?.filter((order) =>
      selection.includes(order.id.toString()),
    );
    const newTotal =
      selectedOrders?.reduce((sum, order) => {
        return sum + order.product.price * order.quantity;
      }, 0) || 0; // Default to 0 if no selection
    setTotal(newTotal);
  };

  // Recalculate total when selection or orders change
  useEffect(() => {
    calculateTotal();
  }, [selection, orders]);

  // Render table rows for each order
  const rows = orders?.map((order) => {
    const selected = selection.includes(order?.id.toString());
    const [myOrder, setMyOrder] = useState(order); // Separate state for each order

    // Update order quantity and recalculate total
    const updateOrderQuantity = (newQuantity: number) => {
      const updatedOrder = { ...myOrder, quantity: newQuantity };
      setMyOrder(updatedOrder);
      const updatedOrders = orders.map((item) =>
        item.id === order.id ? updatedOrder : item,
      );
      setOrders(updatedOrders);
    };

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
                if (myOrder.quantity > 1) {
                  updateOrderQuantity(myOrder.quantity - 1);
                }
              }}
            />
            {myOrder.quantity}
            <IconPlus
              color="green"
              onClick={() => updateOrderQuantity(myOrder.quantity + 1)}
            />
          </Group>
        </Table.Td>
        <Table.Td>{myOrder.quantity * order.product.price}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Paper className={classes.main}>
      <ScrollArea>
        <Table
          miw={400}
          verticalSpacing="sm"
          withRowBorders={false}
          stickyHeader
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: rem(40) }}>
                <Checkbox
                  onChange={toggleAll}
                  checked={selection.length === orders.length}
                  indeterminate={
                    selection.length > 0 && selection.length !== orders.length
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
