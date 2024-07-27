import { faker } from '@faker-js/faker';
import {
  Avatar,
  Badge,
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
  // address: Adress;
}

const jobColors: Record<string, string> = {
  0: 'blue',
  1: 'pink',
};
interface Props {
  activePage: number;
}

export function UsersTable({ activePage }: Props) {
  const [user_data, setUserData] = useState<Person[]>([]);
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
  const rows = user_data.map((user, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} src={faker.image.avatar()} radius={30} />
          <Text fz="sm" fw={500}>
            {user.firstName} {}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge color={jobColors[index % 2]} variant="light">
          {/* {typeof(index)} */}
          {user.role}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Anchor component="button" size="sm">
          {user.email}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{user.phone}</Text>
      </Table.Td>
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
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Employee</Table.Th>
            <Table.Th>Job title</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
