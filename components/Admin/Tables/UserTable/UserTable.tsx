import { faker } from '@faker-js/faker';
import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  rem,
  Paper
} from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import classes from './UserTable.module.css';
import { useGlobalStore } from '@/lib/context/global-store.provider';

interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  photo: string | null;
  // address: Adress;
}

export function UsersTable() {
  const conversations = useGlobalStore((state) => state.conversations)

  const rows = conversations.map((conversation, index) => {
    const user = conversation.users[0]
    return (
      <Table.Tr key={index}>
        <Table.Td>
          <Group gap="sm" wrap="nowrap">
            <Avatar
              size={30}
              src={user.photo ? user.photo : faker.image.avatar()}
              radius={30}
            />

          </Group>
        </Table.Td>
        <Table.Td>
          <Text fz="sm" fw={500} lineClamp={1}>
            {user.firstName} { }
          </Text>
        </Table.Td>
        <Table.Td>
          <Text fz="sm" fw={500} lineClamp={1}>
            {user.lastName} { }
          </Text>
        </Table.Td>
        <Table.Td>
          <Anchor component="button" size="sm" lineClamp={1}>
            {user.shop?.name}
          </Anchor>
        </Table.Td>
        {/* <Table.Td>
        <Text fz="sm">{user.phone}</Text>
      </Table.Td> */}
        <Table.Td>
          <Group gap={0} justify="flex-end">
            <ActionIcon variant="subtle" color="gray">
              <IconPencil
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon variant="subtle" color="red">
              <IconTrash
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    )
  });

  return (
    <Paper w={{ base: '100%', sm: '49%' }} className={classes.main}>
      <Table.ScrollContainer
        maw={'100%'}
        minWidth={'100%'}
        style={{ borderRadius: '10px' }}
      >
        <Table verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Customer</Table.Th>
              <Table.Th>FirstName</Table.Th>
              <Table.Th>LastName</Table.Th>
              <Table.Th>Shop</Table.Th>
              <Table.Th>Action</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        {/* <PaginationDemo activePage={activePage} setPage={setPage} /> */}
      </Table.ScrollContainer>
    </Paper>
  );
}
