import { Group, Avatar, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Dashboard from '../Profile/ProfileDashboard';
import { useGlobalStore } from '@/lib/context/global-store.provider';

export default function SmallComponent() {
  const user = useGlobalStore((state) => state.user);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <Group bg={'none'} onClick={open} wrap="nowrap">
        <Avatar src={user?.avatar?.signedUrl} size="md" />
        <Text fz="md">{user?.fullName}</Text>
      </Group>
      {user ? <Dashboard opened={opened} close={close} actUser={user} /> : ''}
    </div>
  );
}
