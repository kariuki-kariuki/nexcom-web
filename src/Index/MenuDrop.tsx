import { Box, Menu, rem } from '@mantine/core';
import {
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconLogout,
  IconLayoutDashboardFilled,
  IconShoppingBag,
  IconDiamond,
} from '@tabler/icons-react';
import ToggleButton from './ToggleButton';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/appContext';
import { UserContextType } from '../@types/app';
import classes from './MenuDrop.module.css';
import { useDisclosure } from '@mantine/hooks';
import Dashboard from '../apps/Dashboard/Dashboard';
export default function MenuDrop() {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure();
  const { user, updateUser } = useContext(AppContext) as UserContextType;
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
            onClick={() => navigate('/shop')}
            leftSection={
              <IconShoppingBag style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Shop
          </Menu.Item>
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
          <Menu.Item
            leftSection={
              <IconMessageCircle style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={() => navigate('/chat')}
          >
            Chat
          </Menu.Item>
          {user?.shop ? (
            <Menu.Item
              leftSection={
                <IconDiamond style={{ width: rem(14), height: rem(14) }} />
              }
              onClick={() => navigate('/admin')}
            >
              Admin
            </Menu.Item>
          ) : (
            ''
          )}
          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item
            color="red"
            onClick={() => {
              localStorage.removeItem('token');
              updateUser(null);
              navigate('/', { replace: true });
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
      {user ? <Dashboard opened={opened} close={close} actUser={user} /> : ''}
    </Box>
  );
}
