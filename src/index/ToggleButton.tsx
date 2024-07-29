import { Avatar, Group, rem, Text, UnstyledButton } from '@mantine/core';
import { useContext } from 'react';
import { AppContext } from '../context/appContext';
import { UserContextType } from '../@types/app';
import { GithubIcon } from '@mantinex/dev-icons';
import { IconChevronRight } from '@tabler/icons-react';

const ToggleButton = () => {
  const { user } = useContext(AppContext) as UserContextType;
  return (
    <UnstyledButton>
      <Group>
        {user.avatar ? (
          <Avatar src={user.avatar} className="h-full" />
        ) : (
          <GithubIcon size={30} />
        )}
        <div style={{ flex: 1 }}>
          <Text size="sm">{user.name}</Text>
          <Text size="xs">{user.email}</Text>
        </div>
        <IconChevronRight
          style={{ width: rem(14), height: rem(14) }}
          stroke={1.5}
        />
      </Group>
    </UnstyledButton>
  );
};

export default ToggleButton;
