import { Menu, rem } from '@mantine/core';
import {
  IconSettings,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconLogout,
} from '@tabler/icons-react';
import ToggleButton from './ToggleButton';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/appContext';
import { UserContextType } from '../@types/app';

export default function MenuDrop() {
  const navigate = useNavigate();
  const { updateUser } = useContext(AppContext) as UserContextType;
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <div>
          <ToggleButton />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item
          leftSection={
            <IconSettings style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Settings
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
          color="red"
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/', { replace: false });
            updateUser({ name: null, email: null, avatar: null, apiKey: null });
          }}
          leftSection={
            <IconLogout style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Logout
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          leftSection={
            <IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />
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
  );
}
