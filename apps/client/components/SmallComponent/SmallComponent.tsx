import { Group, Avatar, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Dashboard from '@/components/Profile/ProfileDashboard';
import { useGlobalStore } from '@/lib/context/global-store.provider';

export default function SmallComponent() {
  const user = useGlobalStore((state) => state.user);
  const [opened, {toggle}] = useDisclosure(false);
  return (
    <div>
      <Group bg={'none'} onClick={toggle} wrap="nowrap">
        <Avatar src={user?.avatar?.signedUrl} />
        <Text>{user?.fullName}</Text>
      </Group>
      {user ? <Dashboard opened={opened} toggle={toggle} actUser={user} /> : ''}
    </div>
  );
}
