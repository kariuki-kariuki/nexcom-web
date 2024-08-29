import { Group, Avatar, Text } from '@mantine/core';
import { useContext } from 'react';
import { UserContextType } from '../../../@types/app';
import { AppContext } from '../../../context/appContext';

const UserButton = () => {
  const { user } = useContext(AppContext) as UserContextType;

  return (
    <Group bg={'none'}>
      <Avatar src={user?.photo} />
      <div style={{ flex: 1 }}>
        <Text size="sm" fw={500}>
          {user?.firstName}
        </Text>

        <Text c="dimmed" size="xs">
          {user?.email}
        </Text>
      </div>
    </Group>
  );
};

export default UserButton;
