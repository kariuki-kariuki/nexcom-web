import React from 'react';
import Link from 'next/link';
import { IconChevronRight } from '@tabler/icons-react';
import { Group, Text } from '@mantine/core';
import { UserButton } from './UserButton';
import classes from './SimpleRoute.module.css';

function SimpleRoute({ tag, main }: { tag: string; main: string }) {
  return (
    <Group
      py={{ base: 'xs', sm: 'md' }}
      color="scode.8"
      justify="space-between"
      visibleFrom="sm"
    >
      <Group>
        <Link href="/products" className={classes.link}>
          <Text>Dashboard</Text>
          <IconChevronRight />
        </Link>
        <Link href={`/${main.toLocaleLowerCase()}`} className={classes.link}>
          <Text>{main}</Text>
          <IconChevronRight />
        </Link>
        <Text c="scode.8">{tag}</Text>
      </Group>
      <UserButton />
    </Group>
  );
}

export default SimpleRoute;
