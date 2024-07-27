import { Menu, Button, Text, rem } from '@mantine/core';
import {
  //   IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconDotsVertical,
  IconShoppingBagCheck,
} from '@tabler/icons-react';
import { useContext } from 'react';
import {
  ScreenContext,
  screenContextType,
} from '../../../context/screenContext';

function PopMenu() {
  const { updateActiveScreen } = useContext(ScreenContext) as screenContextType;
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <IconDotsVertical />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item
          leftSection={
            <IconShoppingBagCheck style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={() => {
            updateActiveScreen('shop');
          }}
        >
          Shop
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconMessageCircle style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Messages
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconPhoto style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Gallery
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconSearch style={{ width: rem(14), height: rem(14) }} />
          }
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
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

export default PopMenu;
