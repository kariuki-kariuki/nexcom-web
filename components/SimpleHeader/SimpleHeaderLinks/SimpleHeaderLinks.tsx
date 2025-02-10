'use client'
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle'
import React from 'react'
import Link, { LinkProps } from 'next/link'
import { IconHome, IconMessageCircle, IconShoppingBag, IconShoppingCart } from '@tabler/icons-react'
import { Avatar, Box, Burger, Drawer, Group, Modal, Stack, Text } from '@mantine/core'
import DashboardLink from './DashboardLink'
import classes from './SimpleHeaderLinks.module.css';
import { useDisclosure } from '@mantine/hooks'

const links = [
  { label: 'Home', link: '/', icon: IconHome },
  { label: 'Shop', link: '/shop', icon: IconShoppingBag },
  { label: 'Cart', link: '/shop/cart', icon: IconShoppingCart },
  { label: 'Chats', link: '/chat', icon: IconMessageCircle },
]

const SimpleHeaderLinks = () => {
  const [opened, { toggle }] = useDisclosure(false)
  return (
    <div>
      <Group visibleFrom='sm'>
        <Group gap={"lg"}>
          {links.map((link, idx) => <Link href={link.link} className={classes.link} key={idx}>{link.label}</Link>)}
          <DashboardLink />
        </Group>
        <ColorSchemeToggle />
      </Group>
      <Box hiddenFrom='sm'>
        <Burger opened={opened} onClick={toggle} />
        <Drawer opened={opened} onClose={toggle} classNames={{ body: classes.content, content: classes.bg, header: classes.bg }} withCloseButton={false}>
          <Group justify='space-between' className={classes.card}>
            <Group justify="start">
              <Avatar src="/logos/logo.png" />
              <Text py="sm">Nexcom</Text>
            </Group>
            <Burger onClick={toggle} opened={opened}/>
          </Group>
          <Stack justify='space-between' pt="sm" gap={"lg"} h={'100%'}>
            <Stack>
              {links.map((link, idx) => <Link href={link.link} className={classes.link} key={idx}>{link.label}</Link>)}
              <DashboardLink />
            </Stack>
            <ColorSchemeToggle />
          </Stack>
        </Drawer>
      </Box>
    </div>
  )
}

export default SimpleHeaderLinks