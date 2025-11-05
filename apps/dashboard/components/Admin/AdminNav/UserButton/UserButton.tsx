import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './UserButton.module.css';
import { useGlobalStore } from '@repo/shared-logic';

export function UserButton() {
  const user = useGlobalStore((state) => state.user);

  return (
    <UnstyledButton className={classes.user} py={'md'}>
      <Group grow preventGrowOverflow={false} wrap="nowrap">
        <Avatar src={user?.avatar?.signedUrl} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {user?.fullName}
          </Text>

          <Text c="dimmed" size="xs">
           @ {user?.shop?.name}
          </Text>
        </div>

        <IconChevronRight
          size={22}
          stroke={1.5}
        />
      </Group>
    </UnstyledButton>
  );
}
