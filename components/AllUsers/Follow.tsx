'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  IconDots,
  IconPencil,
  IconTrash,
  IconUsersPlus
} from '@tabler/icons-react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
  Notification,
  rem,
  ScrollArea,
  SegmentedControl,
  Stack,
  Table,
  Text
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { GlobalUser } from '../../lib/@types/app';
import { update } from '../../lib/hooks/useFetchHooks';
import SimpleRoute from '../SimpleRoute/SimpleRoute';
import classes from './Follow.module.css';

interface ITableRow {
  item: GlobalUser;
  updateRole: (role: string, id: number) => void;
}
const TableRow = ({ item, updateRole }: ITableRow) => (
  <Table.Tr key={item.id}>
    <Table.Td>
      <Group gap="sm">
        <Avatar size={26} src={item.photo} radius={26} />
        <Text size="sm" fw={500}>
          {`${item.firstName} ${item.lastName}`}
        </Text>
      </Group>
    </Table.Td>
    <Table.Td>{item.email}</Table.Td>
    <Table.Td>{item.role}</Table.Td>
    {/* <Table.Td>
      {item.email !== 'mkmartinoes@gmail.com' ? (
        <Menu classNames={{ dropdown: classes.menu }} trigger="click-hover">
          <MenuTarget>
            <IconDots />
          </MenuTarget>
          <MenuDropdown>
            <Link
              href={`users/edit/${item.id}`}
              style={{ textDecoration: 'none' }}
            >
              <MenuItem
                leftSection={
                  <IconPencil style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Edit
              </MenuItem>
            </Link>
            <Divider />
            <MenuLabel>Update To</MenuLabel>
            {item.role !== 'Employee' && (
              <MenuItem onClick={() => updateRole('Employee', item.id)}>
                Employee
              </MenuItem>
            )}
            {item.role !== 'Manager' && (
              <MenuItem onClick={() => updateRole('Manager', item.id)}>
                Manager
              </MenuItem>
            )}
            {item.role !== 'Admin' && (
              <MenuItem onClick={() => updateRole('Admin', item.id)}>
                Admin
              </MenuItem>
            )}

            <Divider />
            <MenuLabel>Danger</MenuLabel>
            <MenuItem
              color="red"
              leftSection={
                <IconTrash style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Delete
            </MenuItem>
          </MenuDropdown>
        </Menu>
      ) : (
        <IconDots />
      )} */}
    {/* </Table.Td> */}
  </Table.Tr>
);

const TableRowNotification = ({ item, updateRole }: ITableRow) => (
  <Notification key={item.id} withCloseButton={false} mb="sm">
    <Group wrap="nowrap" justify="space-around">
      <Avatar size={26} src={item.photo} radius={26} />
      <Stack gap={2} w="60%">
        <Text size="sm" fw={500} lineClamp={1}>
          {`${item.firstName} ${item.lastName}`}
        </Text>
        <Text lineClamp={1} fz="xs">
          {item.email}
        </Text>
        <Text c="dimmed">{item.role}</Text>
      </Stack>
      <Box>
        {item.email !== 'mkmartinoes@gmail.com' ? (
          <Menu classNames={{ dropdown: classes.menu }} trigger="click-hover">
            <MenuTarget>
              <IconDots />
            </MenuTarget>
            <MenuDropdown>
              <Link
                href={`users/edit/${item.id}`}
                style={{ textDecoration: 'none' }}
              >
                <MenuItem
                  leftSection={
                    <IconPencil style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Edit
                </MenuItem>
              </Link>
              <Divider />
              <MenuLabel>Update To</MenuLabel>
              {item.role !== 'Employee' && (
                <MenuItem onClick={() => updateRole('Employee', item.id)}>
                  Employee
                </MenuItem>
              )}
              {item.role !== 'Manager' && (
                <MenuItem onClick={() => updateRole('Manager', item.id)}>
                  Manager
                </MenuItem>
              )}
              {item.role !== 'Admin' && (
                <MenuItem onClick={() => updateRole('Admin', item.id)}>
                  Admin
                </MenuItem>
              )}

              <Divider />
              <MenuLabel>Danger</MenuLabel>
              <MenuItem
                color="red"
                leftSection={
                  <IconTrash style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Delete
              </MenuItem>
            </MenuDropdown>
          </Menu>
        ) : (
          <IconDots />
        )}
      </Box>
    </Group>
  </Notification>
);
export function Follow({ dbusers }: { dbusers: GlobalUser[] }) {
  const [users, setUsers] = useState(dbusers);
  const [active, setActive] = useState('All');

  const updateRole = async (role: string, id: number) => {
    const res = await update({ resource: `users/${id}`, formData: { role } });
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
      color: 'scode.8'
    });
  };
  const rows = users
    .filter((rowUser) => {
      if (active === 'All') return true;
      return active === rowUser.role;
    })
    .map((item) => (
      <TableRow item={item} updateRole={updateRole} key={item.id} />
    ));
  const rowsNotification = users
    .filter((rowUser) => {
      if (active === 'All') return true;
      return active === rowUser.role;
    })
    .map((item) => (
      <TableRowNotification item={item} updateRole={updateRole} key={item.id} />
    ));

  return (
     
    <>
      <SimpleRoute tag="All Users" main="Users" />
    <Box px="md">
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
        <Box hiddenFrom="sm">{rowsNotification}</Box>
        <Box visibleFrom="sm">
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
        </Box>
      </ScrollArea>
    </Box>
    </>
  );
}
