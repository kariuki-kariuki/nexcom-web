'use client'
import { useState } from 'react';
import {
  IconBellRinging,
  IconFileCvFilled,
  IconFilter2Question,
  IconGraph,
  IconJoinBevel,
  IconListDetails,
  IconLogout,
  IconShoppingBag,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import classes from './NavbarSearch.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, Divider, Group, Paper, Text } from '@mantine/core';

const data = [

  { link: '/dashboard', label: 'Analytics', icon: IconGraph },
  { link: '/dashboard/products', label: 'Products', icon: IconShoppingBag },
  { link: '/dashboard/jobs', label: 'Jobs', icon: IconFileCvFilled },
  { link: '#', label: 'Notifications', icon: IconBellRinging },
  { link: '/dashboard/faq', label: 'FAQs', icon: IconFilter2Question },
];

export function NavbarSearch() {
  const path = usePathname()
  console.log(path)

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.link === path || undefined}
      href={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group bg="none" pb="sm">
          <Avatar src="/logo.png" size="lg" name="N C" />
          <Text>Dashboard</Text>
        </Group>
        <Divider py="md"/>
        {links}
      </div>

      <div className={classes.footer}>
        <Link href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </Link>

        <Link href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}