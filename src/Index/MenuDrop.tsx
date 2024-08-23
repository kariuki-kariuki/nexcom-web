import { Box, Menu, rem, useMantineColorScheme } from '@mantine/core';
import {
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconLogout,
  IconLayoutDashboardFilled,
  IconShoppingBag,
  IconSunFilled,
  IconMoonFilled,
} from '@tabler/icons-react';
import ToggleButton from './ToggleButton';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/appContext';
import { UserContextType } from '../@types/app';
import classes from './MenuDrop.module.css';
export default function MenuDrop() {
  const navigate = useNavigate();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { updateUser } = useContext(AppContext) as UserContextType;
  return (
    <Box p={'md'} className={classes.menu}>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <div>
            <ToggleButton />
          </div>
        </Menu.Target>

        <Menu.Dropdown className={classes.menu_drop}>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item
            component="a"
            href="/shop"
            leftSection={
              <IconShoppingBag style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Shop
          </Menu.Item>
          <Menu.Item
            component="a"
            href="/dashboard"
            leftSection={
              <IconLayoutDashboardFilled
                style={{ width: rem(14), height: rem(14) }}
              />
            }
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconMessageCircle style={{ width: rem(14), height: rem(14) }} />
            }
            component="a"
            href="/chat"
          >
            Messages
          </Menu.Item>
          <Menu.Item
            leftSection={
              colorScheme === 'dark' ? (
                <IconSunFilled style={{ width: rem(14), height: rem(14) }} />
              ) : (
                <IconMoonFilled style={{ width: rem(14), height: rem(14) }} />
              )
            }
            onClick={toggleColorScheme}
          >
            {colorScheme === 'dark' ? 'Light' : 'Dark'}
          </Menu.Item>
          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item
            color="red"
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/', { replace: false });
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
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}
