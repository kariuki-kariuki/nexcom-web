import React from 'react'
import classes from "./OrderTable.module.css"
import { TableScrollContainer, Table, rem, Checkbox, useMantineColorScheme, Avatar } from '@mantine/core'
import { useGlobalStore } from '@/lib/context/global-store.provider';
import Image from 'next/image';
const OrderTable = () => {
  const {colorScheme} = useMantineColorScheme();
  const user = useGlobalStore((state) => state.user);
  const rows = user?.orders?.map((order) => (
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
      <Table.Td>{order.status}</Table.Td>
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

export default OrderTable