'use client';

import logout from '@/utils/logout';
import { Box, Menu, rem, ButtonGroup, Button, useMantineColorScheme } from '@mantine/core';
import { IconShoppingBag, IconLayoutDashboardFilled, IconSunFilled, IconSunMoon, IconDiamond, IconLogout, IconArrowsLeftRight, IconTrash, IconUserCircle } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react'
import Dashboard from '../Profile/ProfileDashboard';
import classes from './Apps.module.css';
import { useDisclosure } from '@mantine/hooks';
import { useGlobalContext } from '@/lib/context/appContext';

const Apps = () => {
  const [opened, { open, close }] = useDisclosure();
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();
  const { user, setUser } = useGlobalContext();


  return (
    <div>
      <Box p={0} className={classes.menu}>
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
                  <IconShoppingBag stroke={1.5} />
                }
              >
                Shop
              </Menu.Item>
            </Link>
            <Menu.Item
              onClick={open}
              leftSection={
                <IconUserCircle
                  stroke={1.5}
                />
              }
            >
              Profile
            </Menu.Item>
            <Menu.Item leftSection={colorScheme === 'dark' ? (
              <IconSunFilled className={classes.linkIcon} stroke={1.5} />
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
                    <IconDiamond stroke={1.5} />
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
                    setUser(null);
                  }}
                  leftSection={
                    <IconLogout stroke={1.5} />
                  }
                >
                  Logout
                </Menu.Item>

                <Menu.Item
                  leftSection={
                    <IconArrowsLeftRight
                      stroke={1.5}
                    />
                  }
                >
                  Transfer my data
                </Menu.Item>
                <Menu.Item
                  color="red"
                  leftSection={
                    <IconTrash stroke={1.5} />
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
          <Dashboard opened={opened} close={close} actUser={user} />
        ) : (
          ''
        )}
      </Box>
    </div>

  )
}

export default Apps