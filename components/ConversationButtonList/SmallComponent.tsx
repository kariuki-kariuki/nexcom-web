import { Group, Avatar, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useContext } from 'react';
import { AppContext } from '../../lib/context/appContext';
import Dashboard from '../Profile/ProfileDashboard';
import { UserContextType } from '@/lib/@types/app';

export default function SmallComponent() {
  const { user } = useContext(AppContext) as UserContextType;
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <Group bg={'none'} onClick={open} wrap="nowrap">
        <Avatar src={user?.avatar?.signedUrl} size="md" />
        <Text fz="md">{`${user?.firstName} ${user?.lastName}`}</Text>
      </Group>
      {user ? <Dashboard opened={opened} close={close} actUser={user} /> : ''}
    </div>
  );
}
