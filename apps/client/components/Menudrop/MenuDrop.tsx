'use client';

import { Paper, Button, Menu, rem, useMantineColorScheme, ButtonGroup } from '@mantine/core';
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
import { useGlobalStore } from '@/lib/context/global-store.provider';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { usePathname } from 'next/navigation';
import { APP_URL, AUTH_URL, DASHBOARD_URL } from '@/lib/common/constants';
import logout from '@repo/shared-logic/src/utils/logout';


export default function MenuDrop() {
  const [opened, { toggle }] = useDisclosure();
  const user = useGlobalStore(state => state.user)
  const path = usePathname()
  return (
    <Paper bg={'none'} px={'md'} className={classes.menu}>
      {user ?
        <DropDown toggle={toggle} />
        :
        <ButtonGroup>
          <Link href={`${AUTH_URL}/login?redirect=${APP_URL}${path}`} referrerPolicy='origin-when-cross-origin' >
            <Button leftSection={<IconLogin size={22}  />} size='md' color='teal.5'>
              Login
            </Button>
          </Link>
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
        <Link href={`/business`}>
          <Menu.Item
            leftSection={
              <IconShoppingBag size={22} />
            }
          >
            Business
          </Menu.Item>
        </Link>
        <Menu.Item
          onClick={toggle}
          leftSection={
            <IconLayoutDashboardFilled
              size={22}
            />
          }
        >
          Profile
        </Menu.Item>
        <Link href={`/chat`}>
          <Menu.Item
            leftSection={
              <IconMessageCircle
                size={22}
              />
            }
          >
            Chat
          </Menu.Item>
        </Link>
        <Menu.Item leftSection={colorScheme === 'dark' ? (
          <IconSunFilled className={classes.linkIcon} size={22} />
        ) : (
          <IconSunMoon className={classes.linkIcon} stroke={1.5} />
        )}
          onClick={toggleColorScheme} >

          <span>{colorScheme === 'dark' ? 'Light' : 'Dark'}</span>
        </Menu.Item>
        {user?.shop ? (
          <Link href={`${DASHBOARD_URL}/dashboard`}>
            <Menu.Item
              leftSection={
                <IconDiamond size={22} />
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
                <IconLogout size={22} />
              }
            >
              Logout
            </Menu.Item>

            <Menu.Item
              leftSection={
                <IconArrowsLeftRight
                  size={22}
                />
              }
            >
              Transfer my data
            </Menu.Item>
            <Menu.Item
              color="red"
              leftSection={
                <IconTrash size={22} />
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