import { faker } from '@faker-js/faker';
import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  rem,
} from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { url } from '../../../data/url';
import PaginationDemo from './PaginationDemo';

// enum IdType {
//   Number = "Number",
//   String = "String",
//   Array = "Array",
//   Object = "Object",
//   Generate = "Generate",
// }

// interface Id {
//   type: IdType;

//   // Use discriminated unions for specific types within the enum
//   numberValue?: bigint; // Use bigint for i64
//   stringValue?: string;
//   arrayValue?: any[]; // Can be refined based on actual array content
//   objectValue?: { [key: string]: any }; // Object literal type
//   generateValue?: (length: number) => string; // Function for generating ID
// }

// interface Adress {
//   address_line_1: string;
//   address_line_2: string | null;
//   city: string;
//   coordinates: string[];
//   country: string;
//   post_code: string;
// }

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

interface Props {
  activePage: number;
}


export function UsersTable() {
  const [user_data, setUserData] = useState<Person[]>([]);
  const [activePage, setPage] = useState<number>(1);

  useEffect(() => {
    fetch(`${url}/users`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          setUserData(res);
          console.log(res);
        });
      } else {
        alert('Failed to fetch user data');
      }
    });
    // console.log(user_data);
  }, [activePage]);
  const rows = user_data.slice(4, 10).map((user, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} src={user.photo ? user.photo : faker.image.avatar()} radius={30} />
          <Text fz="sm" fw={500}>
            {user.firstName} {}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Anchor component="button" size="sm">
          {user.email}
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
  ));

  return (
    <Table.ScrollContainer
      minWidth={10}
      bg={'coco.2'}
      style={{ borderRadius: '10px' }}
      my={"md"}
      py={"md"}
    >
      <Table verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Customer</Table.Th>
            {/* <Table.Th>Job title</Table.Th> */}
            <Table.Th>Email</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <PaginationDemo activePage={activePage} setPage={setPage} />
    </Table.ScrollContainer>
  );
}
