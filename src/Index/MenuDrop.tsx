'use client';

import { Box, Button, ButtonGroup, Menu, rem } from '@mantine/core';
import {
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconLogout,
  IconLayoutDashboardFilled,
  IconShoppingBag,
  IconDiamond
} from '@tabler/icons-react';
import ToggleButton from './ToggleButton';
import { useContext } from 'react';
import { AppContext } from '../../lib/context/appContext';
import { UserContextType } from '../@types/app';
import classes from './MenuDrop.module.css';
import { useDisclosure } from '@mantine/hooks';
import Dashboard from '../apps/Dashboard/Dashboard';
import Link from 'next/link';
export default function MenuDrop() {
  const [opened, { open, close }] = useDisclosure();
  const { user, updateUser } = useContext(AppContext) as UserContextType;
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
          {user?.shop ? (
            <Link href="/admin">
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
                  localStorage.removeItem('token');
                  updateUser(null);
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
      {user ? <Dashboard opened={opened} close={close} actUser={user} /> : ''}
    </Box>
  );
}
