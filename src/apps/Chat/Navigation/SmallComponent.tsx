import { Group, Avatar, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useContext } from 'react';
import { UserContextType } from '../../../@types/app';
import { AppContext } from '../../../context/appContext';
import Dashboard from '../../Dashboard/Dashboard';

export default function SmallComponent() {
  const { user } = useContext(AppContext) as UserContextType;
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <Group bg={'none'} onClick={open} wrap="nowrap">
        <Avatar src={user?.photo} />
        <Text>{user?.firstName}</Text>
      </Group>
      {user ? <Dashboard opened={opened} close={close} actUser={user} /> : ''}
    </div>
  );
}
