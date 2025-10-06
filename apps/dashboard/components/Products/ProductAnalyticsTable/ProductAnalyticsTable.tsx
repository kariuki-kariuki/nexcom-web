import { Table, useMantineColorScheme, Text, Avatar, Group, TableTd } from '@mantine/core'
import React from 'react'
import StatusButton from '../StatusButton/StatusButton'
import { Product } from '@repo/nexcom-types'

interface IProps {
  products: Product[]
}

const ProductAnalyticsTable = ({ products }: IProps) => {
  const rows = products.map((product) => {
    const date = new Date(product.created_at)
    const revenue = product.cartItems.reduce((acc, item) => acc + (item.size.price * item.quantity), 0)
    return (
      <Table.Tr key={product.id}>
        <Table.Td>
          <Group gap="sm" wrap="nowrap">
            <Avatar size={50} src={product.images[0]?.signedUrl} name={product.name} radius="md" />

          </Group>
        </Table.Td>
        <Table.Td>
          <Text size="sm" fw={500}>
            {product.name}
          </Text>
        </Table.Td>
        <Table.Td>
          <StatusButton status={product.status} />
        </Table.Td>
        <Table.Td>
          <Text>{product.analytics?.length} </Text>
        </Table.Td>
        <Table.Td>
          {revenue > 1000 ? `${revenue / 1000}K` : revenue}
        </Table.Td>
        <TableTd>
          {product?.cartItems.length}
        </TableTd>
      </Table.Tr>
    )
  })
  const { colorScheme } = useMantineColorScheme()
  return (
    <Table miw={800} verticalSpacing="sm" striped stripedColor={colorScheme === 'dark' ? 'rgba(0, 0, 0, .2)' : 'gray.1'}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Image</Table.Th>
          <Table.Th>Product Name</Table.Th>
          <Table.Th><Text ta="center">Status</Text></Table.Th>
          <Table.Th>Interactions</Table.Th>
          <Table.Th>Revenue (KSH)</Table.Th>
          <Table.Th>Orders</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  )
}

export default ProductAnalyticsTable