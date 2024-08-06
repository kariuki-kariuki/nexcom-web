import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './UserButton.module.css';
import { useContext } from 'react';
import { AppContext } from '../../context/appContext';
import { UserContextType } from '../../@types/app';

export function UserButton() {
  const { user } = useContext(AppContext) as UserContextType;
  console.log(user);
  return (
    <UnstyledButton className={classes.user} py={'md'}>
      <Group>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {user.firstName}
          </Text>

          <Text c="dimmed" size="xs">
            {user?.email}
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
