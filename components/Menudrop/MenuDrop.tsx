'use client';

import { Box, Button, ButtonGroup, Menu, rem, useMantineColorScheme } from '@mantine/core';
import {
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconLogout,
  IconLayoutDashboardFilled,
  IconShoppingBag,
  IconDiamond,
  IconSunMoon,
  IconSunFilled
} from '@tabler/icons-react';
import ToggleButton from './ToggleButton';
import { useGlobalContext } from '../../lib/context/appContext';
import classes from './MenuDrop.module.css';
import { useDisclosure } from '@mantine/hooks';
import Dashboard from '../Profile/ProfileDashboard';
import Link from 'next/link';
import logout from '@/utils/logout';
import { useWebSocket } from '@/lib/hooks/useWebsockets';
export default function MenuDrop() {
  const [opened, { open, close }] = useDisclosure();
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();
  const { dispatch } = useWebSocket()
  const { user, setUser } = useGlobalContext();
  return (
    <Box px={'md'} py={'sm'} className={classes.menu}>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <div>
            <ToggleButton />
          </div>
        </Menu.Target>

        <Menu.Dropdown className={classes.menu_drop}>
          <Menu.Label>Application</Menu.Label>
          <Link href="/shop">
            <Menu.Item
              leftSection={
                <IconShoppingBag style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Shop
            </Menu.Item>
          </Link>
          <Menu.Item
            onClick={open}
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
            <IconSunFilled className={classes.linkIcon} style={{width: rem(14), height: rem(14)}} />
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
                  dispatch({ type: 'SET_CONVERSATIONS', payload: [] })
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
          ) : (
            <>
              <Menu.Divider />
              <Menu.Label>Login / Register</Menu.Label>
              <Menu.Item>
                <ButtonGroup>
                  <Link href="/auth/login">
                    <Button>Login</Button>
                  </Link>
                  <Link href="/login"></Link>
                </ButtonGroup>
              </Menu.Item>
            </>
          )}
        </Menu.Dropdown>
      </Menu>
      {user ? <Dashboard opened={opened} close={close} actUser={user} /> : ''}
    </Box>
  );
}
