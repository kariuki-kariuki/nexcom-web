import { Menu, Text, rem } from '@mantine/core';
import {
  //   IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconDotsVertical,
  IconShoppingBagCheck
} from '@tabler/icons-react';
import { useContext } from 'react';


function PopMenu() {
  
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <IconDotsVertical />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item
          leftSection={
            <IconShoppingBagCheck size={22} />
          }
          onClick={() => {
            
          }}
        >
          Shop
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconMessageCircle size={22} />
          }
        >
          Messages
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconPhoto size={22} />
          }
        >
          Gallery
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconSearch size={22} />
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
            <IconArrowsLeftRight size={22} />
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
      </Menu.Dropdown>
    </Menu>
  );
}

export default PopMenu;
