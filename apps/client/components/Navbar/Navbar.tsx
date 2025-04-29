'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  IconDiamondFilled,
  IconListTree,
  IconLogout,
  IconMessage,
  IconShoppingBag,
  IconShoppingCart
} from '@tabler/icons-react';
import { Avatar, Box, Burger, Code, Drawer, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import logout from '../../utils/logout';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import classes from './Navbar.module.css';
import { useGlobalStore } from '@/lib/context/global-store.provider';

const data = [
  { link: '/dashboard', label: 'Dashboard', icon: IconDiamondFilled },
  { link: '/dashboard/products', label: 'Stock', icon: IconListTree },
  { link: '/cart', label: 'Cart', icon: IconShoppingCart },
  { link: '/chat', label: 'Chats', icon: IconMessage },
  { link: '/business/product', label: 'Products', icon: IconShoppingBag },
];

export function Navbar() {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname()
  const setConversations = useGlobalStore((store) => store.setConversations)

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.link === pathname || undefined}
      key={item.label}
      href={`${item.link}`}
      onClick={(event) => {
        event.preventDefault();
        router.push(`${item.link}`);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Link href="/">
            <Avatar src="/logos/logo.png" alt="Nexcom logo" />
          </Link>
          <Code fw={700} visibleFrom="sm">
            Dashboard
          </Code>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" />
        </Group>
        <Box visibleFrom="sm">
          {links}</Box>
      </div>

      <Box className={classes.footer} visibleFrom="sm">
        <ColorSchemeToggle />

        <a
          href="#"
          className={classes.link}
          onClick={(event) => {
            event.preventDefault();
            logout();
            setConversations([])

          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Box>
      <Drawer opened={opened} onClose={toggle} withCloseButton classNames={{ body: classes.root, content: classes.root, header: classes.root }}>
        <Stack justify="space-between" h="80vh">
          <div>{links}</div>
          <Box className={classes.footer}>
            <ColorSchemeToggle />

            <a
              href="#"
              className={classes.link}
              onClick={(event) => {
                event.preventDefault();
                logout();
                setConversations([])
              }}
            >
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          </Box>
        </Stack>
      </Drawer>
    </nav>
  );
}
