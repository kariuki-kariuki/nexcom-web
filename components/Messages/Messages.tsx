'use client';

import { useContext, useState } from 'react';
import { IconDots, IconTrash } from '@tabler/icons-react';
import cx from 'clsx';
import {
  Badge,
  Box,
  Button,
  Divider,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  Modal,
  Notification,
  rem,
  ScrollArea,
  SegmentedControl,
  Stack,
  Table,
  Text
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { UserContextType } from '../../lib/@types/app';
import { Message } from '../../lib/@types/messages';
import ReadMessage from './ReadMessage';
import classes from './Messages.module.css';
import { AppContext } from '@/lib/context/appContext';
import { datasource } from '@/lib/common/datasource';

interface IRow {
  message: Message;
  handleUpdate: (message: Message, status: string) => void;
}
const Rows = ({ message, handleUpdate }: IRow) => {
  const [opened, { toggle }] = useDisclosure(false);
  const { user } = useContext(AppContext) as UserContextType;
  return (
    <Table.Tr key={message.id}>
      <Modal opened={opened} onClose={toggle}>
        <ReadMessage message={message} />
      </Modal>
      <Table.Td>
        <Badge circle>{message.name.charAt(0).toLocaleUpperCase()}</Badge>
      </Table.Td>
      <Table.Td>{message.name}</Table.Td>
      <Table.Td>{message.email}</Table.Td>
      <Table.Td>
        <Button
          variant="outline"
          w="fit-content"
          bd="none"
          color={message.status === 'Unread' ? 'orange.7' : 'green.9'}
        >
          {message.status}
        </Button>
      </Table.Td>
      <Table.Td>
        <Menu trigger="click-hover">
          <Menu.Target>
            <IconDots />
          </Menu.Target>
          <MenuDropdown>
            <Menu.Label>Action</Menu.Label>
            <MenuItem
              onClick={() => {
                toggle();
                if (user?.role !== 'Employee' && message.status !== 'Read') {
                  handleUpdate(message, 'Read');
                }
              }}
            >
              Read
            </MenuItem>
            {message.status === 'Read' && (
              <MenuItem
                onClick={() => {
                  if (user?.role !== 'Employee' && message.status === 'Read') {
                    handleUpdate(message, 'Unread');
                  }
                }}
              >
                Mark as Unread
              </MenuItem>
            )}
            <Divider />
            {user?.role !== 'Employee' && (
              <>
                {' '}
                <Menu.Label>Danger</Menu.Label>
                <MenuItem
                  color="red"
                  leftSection={
                    <IconTrash style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Delete
                </MenuItem>
              </>
            )}
          </MenuDropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  );
};

const NotificationRows = ({ message, handleUpdate }: IRow) => {
  const [opened, { toggle }] = useDisclosure(false);
  const { user } = useContext(AppContext) as UserContextType;
  return (
    <Notification
      key={message.id}
      color={message.status === 'Unread' ? 'orange.7' : 'green.9'}
      withCloseButton={false}
      mb="sm"
    >
      <Modal opened={opened} onClose={toggle}>
        <ReadMessage message={message} />
      </Modal>
      <Group justify="space-between">
        <Stack>
          <Text>{message.name}</Text>
          <Text>{message.email}</Text>
        </Stack>
        <Box>
          <Menu trigger="click-hover">
            <Menu.Target>
              <IconDots />
            </Menu.Target>
            <MenuDropdown>
              <Menu.Label>Action</Menu.Label>
              <MenuItem
                onClick={() => {
                  toggle();
                  if (user?.role !== 'Employee' && message.status !== 'Read') {
                    handleUpdate(message, 'Read');
                  }
                }}
              >
                Read
              </MenuItem>
              {message.status === 'Read' && (
                <MenuItem
                  onClick={() => {
                    if (
                      user?.role !== 'Employee' &&
                      message.status === 'Read'
                    ) {
                      handleUpdate(message, 'Unread');
                    }
                  }}
                >
                  Mark as Unread
                </MenuItem>
              )}
              <Divider />
              {user?.role !== 'Employee' && (
                <>
                  {' '}
                  <Menu.Label>Danger</Menu.Label>
                  <MenuItem
                    color="red"
                    leftSection={
                      <IconTrash style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    Delete
                  </MenuItem>
                </>
              )}
            </MenuDropdown>
          </Menu>
        </Box>
      </Group>
    </Notification>
  );
};

export function Messages({ messagesDb }: { messagesDb: Message[] }) {
  const [active, setActive] = useState('All');
  const [messages, setMessage] = useState(messagesDb);
  const [scrolled, setScrolled] = useState(false);

  const handleUpdate = async (message: Message, status: string) => {
    const {error} = await datasource.update({ status },
      `messages/${message.id}`,
      
    );
    if (!error) {
      notifications.show({
        title: 'Success',
        message: error,
        color: 'coco.0'
      });
      setMessage((prevmSages) =>
        prevmSages.map((item) => {
          if (item.id === message.id) {
            item.status = status;
            return item;
          }
          return item;
        })
      );
    }
  };
  const rows = messages
    .filter((item) => {
      if (active.toLowerCase() === 'all') return true;
      return active.toLowerCase() === item.status.toLowerCase();
    })
    .map((message) => (
      <Rows message={message} handleUpdate={handleUpdate} key={message.id} />
    ));

  const nRows = messages
    .filter((item) => {
      if (active.toLowerCase() === 'all') return true;
      return active.toLowerCase() === item.status.toLowerCase();
    })
    .map((message) => (
      <NotificationRows
        message={message}
        handleUpdate={handleUpdate}
        key={message.id}
      />
    ));

  return (
    <Box px="md">
      <SegmentedControl
        radius="xl"
        size="sm"
        data={['All', 'Unread', 'Read']}
        classNames={classes}
        onChange={setActive}
      />

      <ScrollArea
        h={300}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Box hiddenFrom="sm">{nRows}</Box>
        <Box visibleFrom="sm">
          <Table miw={700}>
            <Table.Thead
              className={cx(classes.header, { [classes.scrolled]: scrolled })}
            >
              <Table.Tr>
                <Table.Th />
                <Table.Th>Name</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Box>
      </ScrollArea>
    </Box>
  );
}
