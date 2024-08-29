import {
  Avatar,
  Box,
  Card,
  Drawer,
  Group,
  Text,
  TextInput,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import { GlobalUser } from '../../../@types/chat';
import { PostFecthFX } from '../../../hooks/fetchFX';

interface DProps {
  opened: boolean;
  toggle: () => void;
}

const NewMessage = ({ opened = true, toggle }: DProps) => {
  const [value, setValue] = useState('');
  const [users, setUsers] = useState<GlobalUser[] | null>(null);

  const usersFound = users?.map((user) => (
    <Card radius={'md'} shadow="md" mb={'md'}>
      <Group>
        <Avatar src={user.photo} />
        <Text>{user.firstName}</Text>
      </Group>
    </Card>
  ));
  const handleSubmit = async () => {
    const body = { text: value };
    console.log(value);
    const { result } = await PostFecthFX<GlobalUser[], { text: string }>({
      resource: `users/search`,
      method: 'POST',
      body,
    });
    if (result) {
      setUsers(result);
      console.log(result);
    }
  };
  return (
    <Drawer opened={opened} onClose={toggle}>
      <Box>
        <TextInput
          rightSection={
            <IconSearch size={20} color="teal" onClick={handleSubmit} />
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
          my={'md'}
        />
        {usersFound}
      </Box>
    </Drawer>
  );
};

export default NewMessage;
