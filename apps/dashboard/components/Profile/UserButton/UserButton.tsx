import { Group, Avatar, Text } from '@mantine/core';
import { useGlobalStore } from '@repo/shared-logic';

const UserButton = () => {
  const user = useGlobalStore((state) => state.user);

  return (
    <Group bg={'none'}>
      <Avatar src={user?.avatar?.signedUrl} />
      <div style={{ flex: 1 }}>
        <Text size="sm" fw={500}>
          {user?.fullName}
        </Text>

        <Text c="dimmed" size="xs">
          {user?.shop && `@ ${user.shop.name}`}
        </Text>
      </div>
    </Group>
  );
};

export default UserButton;
