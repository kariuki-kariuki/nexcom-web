import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './UserButton.module.css';
import { useContext } from 'react';
import { UserContextType } from '@/lib/@types/app';
import { AppContext } from '@/lib/context/appContext';

export function UserButton() {
  const { user } = useContext(AppContext) as UserContextType;

  return (
    <UnstyledButton className={classes.user} py={'md'}>
      <Group grow preventGrowOverflow={false} wrap="nowrap">
        <Avatar src={user?.photo} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {user?.firstName}
          </Text>

          <Text c="dimmed" size="xs">
           @ {user?.shop?.name}
          </Text>
        </div>

        <IconChevronRight
          style={{ width: rem(14), height: rem(14) }}
          stroke={1.5}
        />
      </Group>
    </UnstyledButton>
  );
}
