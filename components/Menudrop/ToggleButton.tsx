import { Avatar, Group, rem, Text, UnstyledButton } from '@mantine/core';
import { useContext } from 'react';
import { AppContext } from '../../lib/context/appContext';
import { IconChevronRight } from '@tabler/icons-react';
import { UserContextType } from '@/lib/@types/app';

const ToggleButton = () => {
  const { user } = useContext(AppContext) as UserContextType;
  return (
    <UnstyledButton p={0}>
      <Group align="center" h={'100%'} justify="center" w={'100%'}>
        <Avatar src={user?.photo} className="h-full" />
        <div style={{ flex: 1 }}>
          <Text size="sm">{user?.firstName}</Text>
          <Text size="xs" lineClamp={1}>
             {user?.shop && `@ ${user.shop.name}`}
          </Text>
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
