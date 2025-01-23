'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  IconBlockquote,
  IconDesk,
  IconHeartHandshake,
  IconListTree,
  IconLogout,
  IconMessage,
  IconPdf,
  IconPropeller,
  IconUser
} from '@tabler/icons-react';
import { Avatar, Box, Burger, Code, Drawer, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import logout from '../../utils/logout';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import classes from './Navbar.module.css';

const data = [
  { link: '/products', label: 'Products', icon: IconListTree },
  { link: '/users', label: 'Followers', icon: IconUser },
  { link: '/faq', label: 'FAQs', icon: IconBlockquote },
  { link: '/jobs', label: 'Jobs', icon: IconDesk },
  { link: '/tenders', label: 'Tenders', icon: IconHeartHandshake }
];

export function Navbar() {
  const [active, setActive] = useState('Products');
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname()
  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      key={item.label}
      href={`/dashboard${item.link}`}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        router.push(`/dashboard${item.link}`);
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
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Box>
      <Drawer opened={opened} onClose={toggle} withCloseButton classNames={{body: classes.root, content: classes.root, header: classes.root}}>
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
