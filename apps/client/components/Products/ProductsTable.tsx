'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IconCirclePlusFilled } from '@tabler/icons-react';
import {
  Box,
  Button,
  Group,
  ScrollArea,
  SegmentedControl,
  Table,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Product } from '../../lib/@types/shop';
import { Row } from './Row';
import classes from './Products.module.css';
import { RowNotification } from './RowNotification';

export function ProductsTable({ products }: { products: Product[] }) {
  const [active, setActive] = useState('All');
  const [allPrds, setProducts] = useState<Product[]>(products);
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const { colorScheme } = useMantineColorScheme()
  const rows = allPrds
    ?.filter((product) => {
      if (active.toLowerCase() === 'all') return true;
      return active.toLowerCase() === product.status.toLowerCase();
    })
    .map((product) => (
      <Row prd={product} key={product.id} setProducts={setProducts} />
    ));

  const rowsNotification = allPrds
    ?.filter((product) => {
      if (active.toLowerCase() === 'all') return true;
      return active.toLowerCase() === product.status.toLowerCase();
    })
    .map((product, index) => (
      <RowNotification
        prd={product}
        key={product.id}
        setProducts={setProducts}
        index={index}
      />
    ));
  return (
    <Box>
      <Group justify="space-between" wrap="nowrap" pb="md">
        <SegmentedControl
          radius="xl"
          size={mobile ? 'xs' : 'sm'}
          data={['All', 'Published', 'Draft', 'Archived']}
          classNames={classes}
          onChange={setActive}
        />
        <Link href="/dashboard/products/create">
          <Button
            variant="default"
            size={mobile ? 'xs' : 'sm'}
            leftSection={<IconCirclePlusFilled color="teal" />}
            radius="xl"
          >
            Add
          </Button>
        </Link>
      </Group>
      <ScrollArea h="80vh">
        <Box hiddenFrom="sm">{rowsNotification}</Box>
        <Table miw={800} verticalSpacing="sm" striped stripedColor={colorScheme === 'dark' ? 'rgba(0, 0, 0, .2)' : 'gray.1'} visibleFrom="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Image</Table.Th>
              <Table.Th>Product Name</Table.Th>
              <Table.Th><Text ta="center">Status</Text></Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Created at</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{mobile ? '' : rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Box>
  );
}
