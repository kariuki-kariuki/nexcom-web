'use client';

import { Paper, Button, Menu, rem, useMantineColorScheme, Group, Text, ButtonGroup } from '@mantine/core';
import {
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconLogout,
  IconLayoutDashboardFilled,
  IconShoppingBag,
  IconDiamond,
  IconSunMoon,
  IconSunFilled,
  IconLogin
} from '@tabler/icons-react';
import ToggleButton from './ToggleButton';
import classes from './MenuDrop.module.css';
import { useDisclosure } from '@mantine/hooks';
import Dashboard from '../Profile/ProfileDashboard';
import Link from 'next/link';
import logout from '@/utils/logout';
import { useGlobalStore } from '@/lib/context/global-store.provider';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { useRouter } from 'next/navigation';


export default function MenuDrop() {
  const [opened, { toggle }] = useDisclosure();
  const user = useGlobalStore(state => state.user)
  const setUser = useGlobalStore(state => state.setUser)
  const router = useRouter()
  return (
    <Paper bg={'none'} px={'md'} className={classes.menu}>
      {user ?
        <DropDown toggle={toggle} />
        :
        <ButtonGroup>
          <Button onClick={() => router.push('/auth/login')} leftSection={<IconLogin size={18} />} size='md' color='coco.4'>
            Login
          </Button>
          <ColorSchemeToggle />
        </ButtonGroup>}
      {user ? <Dashboard opened={opened} toggle={toggle} actUser={user} /> : ''}
    </Paper>
  );
}


const DropDown = ({ toggle }: { toggle: () => void }) => {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();
  const setConversations = useGlobalStore((store) => store.setConversations)
  const user = useGlobalStore(state => state.user)
  const setUser = useGlobalStore(state => state.setUser)
  return (
    <Menu width={200}>
      <Menu.Target>
        <div>
          <ToggleButton />
        </div>
      </Menu.Target>

      <Menu.Dropdown className={classes.menu_drop}>
        <Menu.Label>Application</Menu.Label>
        <Link href="/business">
          <Menu.Item
            leftSection={
              <IconShoppingBag style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Business
          </Menu.Item>
        </Link>
        <Menu.Item
          onClick={toggle}
          leftSection={
            <IconLayoutDashboardFilled
              style={{ width: rem(14), height: rem(14) }}
            />
          }
        >
          Profile
        </Menu.Item>
        <Link href="/chat">
          <Menu.Item
            leftSection={
              <IconMessageCircle
                style={{ width: rem(14), height: rem(14) }}
              />
            }
          >
            Chat
          </Menu.Item>
        </Link>
        <Menu.Item leftSection={colorScheme === 'dark' ? (
          <IconSunFilled className={classes.linkIcon} style={{ width: rem(14), height: rem(14) }} />
        ) : (
          <IconSunMoon className={classes.linkIcon} stroke={1.5} />
        )}
          onClick={toggleColorScheme} >

          <span>{colorScheme === 'dark' ? 'light' : 'Dark'}</span>
        </Menu.Item>
        {user?.shop ? (
          <Link href="/dashboard">
            <Menu.Item
              leftSection={
                <IconDiamond style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Admin
            </Menu.Item>
          </Link>
        ) : (
          ''
        )}
        {user ? (
          <>
            <Menu.Divider />
            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item
              color="red"
              onClick={() => {
                logout();
                setConversations([])
                setUser(null);
              }}
              leftSection={
                <IconLogout style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Logout
            </Menu.Item>

            <Menu.Item
              leftSection={
                <IconArrowsLeftRight
                  style={{ width: rem(14), height: rem(14) }}
                />
              }
            >
              Transfer my data
            </Menu.Item>
            <Menu.Item
              color="red"
              leftSection={
                <IconTrash style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Delete my account
            </Menu.Item>
          </>
        ) : ''}
      </Menu.Dropdown>
    </Menu>
  )
}