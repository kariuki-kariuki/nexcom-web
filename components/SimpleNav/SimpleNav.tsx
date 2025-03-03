'use client';
import { Box, Avatar, Stack, useMantineColorScheme } from '@mantine/core'
import { IconHome, IconShoppingBag, IconShoppingCart, IconMessageCircle, IconDiamond, IconSunFilled, IconSunMoon, IconLogout } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'
import classes from './styles.module.css';
import { useGlobalContext } from '@/lib/context/appContext';
import logout from '@/utils/logout';
import Dashboard from '../Profile/ProfileDashboard';
import { useDisclosure } from '@mantine/hooks';
import { useChat } from '@/lib/context/ConversationContext';
const links = [
  { label: 'Home', link: '/', icon: IconHome },
  { label: 'Shop', link: '/shop', icon: IconShoppingBag },
  { label: 'Cart', link: '/cart', icon: IconShoppingCart },
  { label: 'Chats', link: '/chat', icon: IconMessageCircle },
]
const SimpleNav = () => {
  const { user } = useGlobalContext();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const [opened, {toggle}] = useDisclosure() 
  const { dispatch } = useChat()
  return (
    <div className={classes.main}>
      <Stack justify='space-between' h="100%" align='center'>
        <Stack gap={"md"} align='center' py="sm">
        <Avatar src={user?.photo} onClick={toggle}/>
          {links.map((link, idx) => <Link href={link.link} className={classes.link} key={idx}><link.icon stroke={1.5} className={classes.linkIcon} /></Link>)}
          {user?.shop && <Link href='/dashboard' className={classes.link} ><IconDiamond stroke={1.5} className={classes.linkIcon} /></Link>}
        </Stack>
        <div>
          <Box className={classes.link} onClick={toggleColorScheme}>
            {colorScheme === 'dark' ? (
              <IconSunFilled className={classes.linkIcon} stroke={1.5} />
            ) : (
              <IconSunMoon className={classes.linkIcon} stroke={1.5} />
            )}
          </Box>
          <a
          href="#"
          className={classes.link}
          onClick={(event) => {
            event.preventDefault();
            logout();
            dispatch({ type: 'SET_CONVERSATIONS', payload: [] })

          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
        </a>
        </div>
      </Stack>
      {user ? <Dashboard opened={opened} close={toggle} actUser={user} /> : ''}
    </div>
  )
}

export default SimpleNav