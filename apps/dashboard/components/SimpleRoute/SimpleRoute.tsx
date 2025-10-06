'use client';
import React from 'react';
import Link from 'next/link';
import { Breadcrumbs, Group, Paper, Text } from '@mantine/core';
import classes from './SimpleRoute.module.css';
import MenuDrop from '../Menudrop/MenuDrop';
import { usePathname } from 'next/navigation';

function SimpleRoute({ tag, main }: { tag?: string; main?: string }) {
  const path = usePathname()
  const pathArray = path.split('/')
  pathArray.shift()
  return (
    <div className={classes.nav}>
      <Group justify="space-between" align="center" w="100%">
        <Breadcrumbs separator="→" separatorMargin="lg" c='maroon.6' h="100%">
          {pathArray.map((item, index) => {
            const link = '/' + pathArray.slice(0, index + 1).join('/')
            const label = item.charAt(0).toUpperCase() + item.slice(1);
            return ((item === 'update' || item === "create") ? <Text key={index}>{label}</Text> : <Link className={classes.link} key={index} href={link} data-active={path === link || undefined}>
              {label}
            </Link>)
          })}
        </Breadcrumbs>
        <Paper bg="none" visibleFrom='sm'>
          <MenuDrop />
        </Paper>
      </Group>
    </div>
  );
}

export default SimpleRoute;
