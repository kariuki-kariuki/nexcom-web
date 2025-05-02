'use client';
import React from 'react';
import Link from 'next/link';
import { IconChevronRight } from '@tabler/icons-react';
import { Breadcrumbs, Group, Paper, Text } from '@mantine/core';
import classes from './SimpleRoute.module.css';
import MenuDrop from '../Menudrop/MenuDrop';
import { usePathname } from 'next/navigation';

function SimpleRoute({ tag, main }: { tag?: string; main?: string }) {
  const path = usePathname()
  const pathArray = path.split('/')
  pathArray.shift()
  return (
    <Paper className={classes.nav}>
      <Group justify="space-between" align="center" w="100%">
        <Breadcrumbs separator="→" separatorMargin="lg" c='maroon.6'>
          {pathArray.map((item, index) => (item === 'update' || item === "create") ? <Text key={index}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text> : <Link className={classes.link} key={index} href={'/' + pathArray.slice(0, index + 1).join('/')}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Link>)}
        </Breadcrumbs>
        <Paper bg="none" visibleFrom='sm'>
          <MenuDrop />
        </Paper>
      </Group>
    </Paper>
  );
}

export default SimpleRoute;
