import { faker } from '@faker-js/faker';
import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  rem
} from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import classes from './UserTable.module.css';
import { useWebSocket } from '@/lib/hooks/useWebsockets';

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
  // const [activePage, setPage] = useState<number>(1);
  const { state } = useWebSocket()
  
  const rows = state.conversations.map((conversation, index) => { 
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
          <Text fz="sm" fw={500} lineClamp={1}>
            {user.firstName} {}
          </Text>
        </Group>
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
  )});

  return (
    <Table.ScrollContainer
      maw={'100%'}
      minWidth={'100%'}
      className={classes.main}
      style={{ borderRadius: '10px' }}
      my={'md'}
      py={'md'}
    >
      <Table verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Customer</Table.Th>
            <Table.Th>Shop</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      {/* <PaginationDemo activePage={activePage} setPage={setPage} /> */}
    </Table.ScrollContainer>
  );
}
