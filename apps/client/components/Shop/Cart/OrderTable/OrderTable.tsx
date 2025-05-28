import React, { useEffect, useState } from 'react'
import classes from "./OrderTable.module.css"
import { TableScrollContainer, Table, useMantineColorScheme, Avatar, Button } from '@mantine/core'
import { useGlobalStore } from '@/lib/context/global-store.provider';
import { Order, OrderState } from '@/lib/@types/app';
import { datasource } from '@/lib/common/datasource';
const OrderTable = () => {
  const { colorScheme } = useMantineColorScheme();
  const user = useGlobalStore((state) => state.user);
  const [orders, setOrders] = useState<Order[]>([])
  console.log(orders);
  useEffect(() => {
    const getOrders = async () => {
      const { data } = await datasource.get<Order[]>('orders');
      if (data) {
        setOrders(data)
      }
    }
    getOrders();
  }, [user])
  const rows = orders.map((order) => (
    <Table.Tr key={order.id}>
      <Table.Td>{order.orderNumber}</Table.Td>
      <Table.Td>
        <Avatar
          size={70}
          radius="md"
          src={order.cartItems[0].product.images[0].signedUrl}
          alt='image'
        />
      </Table.Td>
      <Table.Td>{order.cartItems[0].product.name}</Table.Td>
      <Table.Td><OrderStateBTN state={order.status}/></Table.Td>
      <Table.Td>{order.totalAmount}</Table.Td>
      <Table.Td>{order.cartItems.length}</Table.Td>
      <Table.Td>View</Table.Td>
    </Table.Tr>
  ))
  return (
    <div>
      <TableScrollContainer maxHeight="80vh" minWidth={500}>
        <Table
          miw={400}
          verticalSpacing="lg"
          withRowBorders={true}
          stickyHeader
          striped
          classNames={{ th: classes.header }}
          stripedColor={colorScheme === 'dark' ? 'rgba(0, 0, 0, .1)' : 'rgba(0, 0, 0, .05)'}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                Order Number
              </Table.Th>
              <Table.Th>Product Image</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Packages</Table.Th>
              <Table.Th>View Details</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </TableScrollContainer>
    </div>

  )
}

const OrderStateBTN = ({ state }: { state: OrderState }) => {
  let color = "teal.5"
  switch (state) {

    case OrderState.CANCELED: {
      color = "gray.5"
    };

    case OrderState.PENDING: {
      color = "orange.6"
    }

    case OrderState.FAILED: {
      color = "red.7";
    }
    case OrderState.SUCCESS: {
      color = "teal.6"
    }
  }

  return <Button color={color} variant='light'>
    {state.toUpperCase()}
  </Button>
}

export default OrderTable