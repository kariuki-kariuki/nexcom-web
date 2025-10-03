'use client';

import { useState } from 'react';
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
  Paper,
  rem,
  ScrollArea,
  SegmentedControl,
  Stack,
  Table,
  Text
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import ReadMessage from './ReadMessage';
import classes from './Messages.module.css';
import { Message } from '@repo/nexcom-types';
import { datasource, useGlobalStore } from '@repo/shared-logic';

interface IRow {
  message: Message;
  handleUpdate: (message: Message, status: string) => void;
}
const Rows = ({ message, handleUpdate }: IRow) => {
  const [opened, { toggle }] = useDisclosure(false);
  const user = useGlobalStore((state) => state.user);
  return (
    <Table.Tr key={message.id}>
      <Modal opened={opened} onClose={toggle}>
        <ReadMessage message={message} />
      </Modal>
      <Table.Td>
        <Badge circle>{message.user.fullName.charAt(0).toLocaleUpperCase()}</Badge>
      </Table.Td>
      <Table.Td>{message.user.fullName}</Table.Td>
      <Table.Td>
        <Button
          variant="outline"
          w="fit-content"
          bd="none"
          color={message.state === '' ? 'orange.7' : 'green.9'}
        >
          {message.state}
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
                if (user?.role !== 'Employee' && message.state !== 'Read') {
                  handleUpdate(message, 'Read');
                }
              }}
            >
              Read
            </MenuItem>
            {message.state === 'Read' && (
              <MenuItem
                onClick={() => {
                  if (user?.role !== 'Employee' && message.state === 'Read') {
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
  const user = useGlobalStore((state) => state.user);
  return (
    <Notification
      key={message.id}
      color={message.state === 'Unread' ? 'orange.7' : 'green.9'}
      withCloseButton={false}
      mb="sm"
    >
      <Modal opened={opened} onClose={toggle}>
        <ReadMessage message={message} />
      </Modal>
      <Group justify="space-between">
        <Stack>
          <Text>{message.user.fullName}</Text>
          <Text>{message.user.fullName}</Text>
        </Stack>
        <Paper>
          <Menu trigger="click-hover">
            <Menu.Target>
              <IconDots />
            </Menu.Target>
            <MenuDropdown>
              <Menu.Label>Action</Menu.Label>
              <MenuItem
                onClick={() => {
                  toggle();
                  if (user?.role !== 'Employee' && message.state !== 'Read') {
                    handleUpdate(message, 'Read');
                  }
                }}
              >
                Read
              </MenuItem>
              {message.state === 'Read' && (
                <MenuItem
                  onClick={() => {
                    if (
                      user?.role !== 'Employee' &&
                      message.state === 'Read'
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
        </Paper>
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
            item.state = status;
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
      return active.toLowerCase() === item.state.toLowerCase();
    })
    .map((message) => (
      <Rows message={message} handleUpdate={handleUpdate} key={message.id} />
    ));

  const nRows = messages
    .filter((item) => {
      if (active.toLowerCase() === 'all') return true;
      return active.toLowerCase() === item.state.toLowerCase();
    })
    .map((message) => (
      <NotificationRows
        message={message}
        handleUpdate={handleUpdate}
        key={message.id}
      />
    ));

  return (
    <Paper px="md">
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
        <Paper hiddenFrom="sm">{nRows}</Paper>
        <Paper visibleFrom="sm">
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
        </Paper>
      </ScrollArea>
    </Paper>
  );
}
