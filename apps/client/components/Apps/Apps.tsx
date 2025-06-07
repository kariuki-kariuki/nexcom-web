'use client';

import logout from '@/utils/logout';
import { Paper, Menu, rem, ButtonGroup, Button, useMantineColorScheme } from '@mantine/core';
import { IconShoppingBag, IconLayoutDashboardFilled, IconSunFilled, IconSunMoon, IconDiamond, IconLogout, IconArrowsLeftRight, IconTrash, IconUserCircle } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react'
import Dashboard from '../Profile/ProfileDashboard';
import classes from './Apps.module.css';
import { useDisclosure } from '@mantine/hooks';
import { useGlobalStore } from '@/lib/context/global-store.provider';

const Apps = () => {
  const [opened, { toggle }] = useDisclosure();
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();
  const user = useGlobalStore(state => state.user)
  const setUser = useGlobalStore(state => state.setUser)
  const setConversations = useGlobalStore((state) => state.setConversations)

  return (
    <div>
      <Paper p={0} className={classes.menu}>
        <Menu shadow="md" width={200} position='right-end'>
          <Menu.Target>
            <div>
              <IconLayoutDashboardFilled
                style={{ width: rem(28), height: rem(28) }}
              />
            </div>
          </Menu.Target>

          <Menu.Dropdown className={classes.menu_drop}>
            <Menu.Label>Apps</Menu.Label>
            <Link href="/shop">
              <Menu.Item
                leftSection={
                  <IconShoppingBag style={{ width: rem(18), height: rem(18) }} />
                }
              >
                Shop
              </Menu.Item>
            </Link>
            <Menu.Item
              onClick={toggle}
              leftSection={
                <IconUserCircle
                  style={{ width: rem(18), height: rem(18) }}
                />
              }
            >
              Profile
            </Menu.Item>
            <Link href="/cart">
              <Menu.Item
                leftSection={
                  <IconShoppingBag style={{ width: rem(18), height: rem(18) }} />
                }
              >
                Cart
              </Menu.Item>
            </Link>
            <Menu.Item leftSection={colorScheme === 'dark' ? (
              <IconSunFilled className={classes.linkIcon} style={{ width: rem(18), height: rem(18) }} />
            ) : (
              <IconSunMoon className={classes.linkIcon} style={{ width: rem(18), height: rem(18) }} />
            )}
              onClick={toggleColorScheme} >

              <span>{colorScheme === 'dark' ? 'light' : 'Dark'}</span>
            </Menu.Item>

            {user?.shop ? (
              <Link href="/dashboard">
                <Menu.Item
                  leftSection={
                    <IconDiamond style={{ width: rem(18), height: rem(18) }} />
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
                    <IconLogout style={{ width: rem(18), height: rem(18) }} />
                  }
                >
                  Logout
                </Menu.Item>

                <Menu.Item
                  leftSection={
                    <IconArrowsLeftRight
                      style={{ width: rem(18), height: rem(18) }}
                    />
                  }
                >
                  Transfer my data
                </Menu.Item>
                <Menu.Item
                  color="red"
                  leftSection={
                    <IconTrash style={{ width: rem(18), height: rem(18) }} />
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
                    <Link href="/login">
                      <Button>Login</Button>
                    </Link>
                    <Link href="/login"></Link>
                  </ButtonGroup>
                </Menu.Item>
              </>
            )}
          </Menu.Dropdown>
        </Menu>
        {user ? (
          <Dashboard actUser={user} toggle={toggle} opened={opened} />
        ) : (
          ''
        )}
      </Paper>
    </div>

  )
}

export default Apps