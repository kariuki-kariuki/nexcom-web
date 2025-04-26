'use client'
import React from 'react'
import Link from 'next/link'
import { IconMessageCircle, IconShoppingBag, IconShoppingCart, IconVideoFilled } from '@tabler/icons-react'
import { Avatar, Box, Burger, Drawer, Group, Paper, Stack, Text } from '@mantine/core'
import DashboardLink, { LoginLink } from './DashboardLink'
import classes from './SimpleHeaderLinks.module.css';
import { useDisclosure } from '@mantine/hooks'
import MenuDrop from '@/components/Menudrop/MenuDrop'

const links = [
  { label: 'Videos', link: '/videos', icon: IconVideoFilled },
  { label: 'Chats', link: '/chat', icon: IconMessageCircle },
  { label: 'Business', link: '/business', icon: IconShoppingBag },
  { label: 'Products', link: '/business/product/tags/all', icon: IconShoppingCart },
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
        <Paper bg="none" visibleFrom='md'>
          <MenuDrop />
        </Paper>
      </Group>
      <Box hiddenFrom='sm'>
        <Burger opened={opened} onClick={toggle} />
        <Drawer opened={opened} onClose={toggle} classNames={{ body: classes.content, content: classes.bg, header: classes.bg }} withCloseButton={false}>
          <Group justify='space-between' className={classes.card}>
            <Group justify="start">
              <Avatar src="/logos/logo.png" />
              <Text py="sm">Nexcom</Text>
            </Group>
            <Burger onClick={toggle} opened={opened} />
          </Group>
          <Stack justify='space-between' pt="sm" gap={"lg"} h={'100%'}>
            <Stack>
              {links.map((link, idx) => <Link href={link.link} className={classes.link} key={idx}> <link.icon className={classes.linkIcon} /> {link.label}</Link>)}
              <DashboardLink />
              <LoginLink />
            </Stack>
            <MenuDrop />
          </Stack>
        </Drawer>
      </Box>
    </div>
  )
}

export default SimpleHeaderLinks