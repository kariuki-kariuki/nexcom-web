import React from 'react';
import Link from 'next/link';
import { IconChevronRight } from '@tabler/icons-react';
import { Group, Text } from '@mantine/core';
import classes from './SimpleRoute.module.css';
import MenuDrop from '../Menudrop/MenuDrop';

function SimpleRoute({ tag, main }: { tag: string; main: string }) {
  return (
    <Group
      py={{ base: 'xs', sm: 'md' }}
      justify="space-between"
      visibleFrom="sm"
    >
      <Group>
        <Link href="/dashboard/products" className={classes.link}>
          <Text>Dashboard</Text>
          <IconChevronRight />
        </Link>
        <Link
          href={`/dashboard/${main.toLocaleLowerCase()}`}
          className={classes.link}
        >
          <Text>{main}</Text>
          <IconChevronRight />
        </Link>
        <Text>{tag}</Text>
      </Group>
      <MenuDrop />
    </Group>
  );
}

export default SimpleRoute;
