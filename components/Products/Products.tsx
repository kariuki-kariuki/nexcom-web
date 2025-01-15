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
  useMantineTheme
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Product } from '../../lib/@types/shop';
import { Row } from './Row';
import classes from './Products.module.css';
import { RowNotification } from './RowNotification';

export function Products({ products }: { products: Product[] }) {
  const [active, setActive] = useState('All');
  const [allPrds, setProducts] = useState<Product[]>(products);
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

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
    .map((product) => (
      <RowNotification
        prd={product}
        key={product.id}
        setProducts={setProducts}
      />
    ));
  return (
    <Box p="md">
      <Group justify="space-between" wrap="nowrap" pb="md">
        <SegmentedControl
          radius="xl"
          size={mobile ? 'xs' : 'sm'}
          data={['All', 'Published', 'Draft', 'Archived']}
          classNames={classes}
          onChange={setActive}
        />
        <Link href="/products/create">
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
        <Table miw={800} verticalSpacing="sm" visibleFrom="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Status</Table.Th>
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
