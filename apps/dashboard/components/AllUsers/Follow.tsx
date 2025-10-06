'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  IconUsersPlus
} from '@tabler/icons-react';
import {
  Avatar,
  Box,
  Button,
  Group,
  Notification,
  Paper,
  ScrollArea,
  SegmentedControl,
  Stack,
  Table,
  Text
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { GlobalUser } from '../../../client/lib/@types/app';
import classes from './Follow.module.css';
import { datasource } from '@repo/shared-logic';

interface ITableRow {
  item: GlobalUser;
  updateFollowStatus: (role: string, id: string) => void;
}
const TableRow = ({ item, updateFollowStatus }: ITableRow) => (
  <Table.Tr key={item.id}>
    <Table.Td>
      <Group gap="sm">
        <Avatar size={26} src={item?.avatar.signedUrl} radius={26} />
        <Text size="sm" fw={500}>
          {item.fullName}
        </Text>
      </Group>
    </Table.Td>
    <Table.Td>{item.shop?.name}</Table.Td>
  </Table.Tr>
);

const TableRowNotification = ({ item, updateFollowStatus }: ITableRow) => (
  <Notification key={item.id} withCloseButton={false} mb="sm">
    <Group wrap="nowrap" justify="space-around">
      <Avatar size={26} src={item?.avatar?.signedUrl} radius={26} />
      <Stack gap={2} w="60%">
        <Text size="sm" fw={500} lineClamp={1}>
          {item.fullName}
        </Text>
        <Text lineClamp={1} fz="xs">
          {item.shop?.name}
        </Text>
        <Text c="dimmed">{item.role}</Text>
      </Stack>

    </Group>
  </Notification>
);
export function Follow({ dbusers }: { dbusers: GlobalUser[] }) {
  const [users, setUsers] = useState(dbusers);
  const [active, setActive] = useState('All');

  const updateFollowStatus = async (role: string, id: string) => {
    const res = await datasource.update({ role }, '');
    if (!res) {
      notifications.show({
        title: 'Failed',
        message: 'An error occured while trying to update User Role',
        color: 'red.7'
      });
      return;
    }
    setUsers((prevUSers) =>
      prevUSers.map((user) => {
        if (user.id === id) {
          user.role = role;
          return user;
        }
        return user;
      })
    );
    notifications.show({
      title: 'Succes',
      message: `Succefully change user role to ${role}`,
      color: 'coco.0'
    });
  };
  const rows = users
    .filter((rowUser) => {
      if (active === 'All') return true;
      return active === rowUser.role;
    })
    .map((item) => (
      <TableRow item={item} updateFollowStatus={updateFollowStatus} key={item.id} />
    ));
  const rowsNotification = users
    .filter((rowUser) => {
      if (active === 'All') return true;
      return active === rowUser.role;
    })
    .map((item) => (
      <TableRowNotification item={item} updateFollowStatus={updateFollowStatus} key={item.id} />
    ));

  return (
    <Paper px="md">
      <Group justify="space-between" pb="xs">
        <SegmentedControl
          radius="xl"
          size="xs"
          data={['All', 'Following', 'Followers']}
          classNames={classes}
          onChange={setActive}
        />
        <Link href="/users/create">
          <Button
            variant="default"
            size="xs"
            leftSection={<IconUsersPlus size={20} color="teal" />}
          >
            New
          </Button>
        </Link>
      </Group>
      <ScrollArea>
        <Paper hiddenFrom="sm">{rowsNotification}</Paper>
        <Paper visibleFrom="sm">
          <Table miw={800} verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>User</Table.Th>
                <Table.Th>Shop</Table.Th>
                <Table.Th>Status</Table.Th>
                {/* <Table.Th>Action</Table.Th> */}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Paper>
      </ScrollArea>
    </Paper>
  );
}
