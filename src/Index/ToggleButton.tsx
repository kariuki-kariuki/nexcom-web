import { Avatar, Grid, Group, rem, Text, UnstyledButton } from '@mantine/core';
import { useContext } from 'react';
import { AppContext } from '../context/appContext';
import { UserContextType } from '../@types/app';
import { IconChevronRight } from '@tabler/icons-react';

const ToggleButton = () => {
  const { user } = useContext(AppContext) as UserContextType;
  return (
    <UnstyledButton>
      <Grid p={0} m={0}>
        <Grid.Col span={3}>
          <Avatar src={user?.photo} className="h-full" />
        </Grid.Col>
        <Grid.Col span={7}>
          <div style={{ flex: 1 }}>
            <Text size="sm">{user?.firstName}</Text>
            <Text size="xs" lineClamp={1}>
              {user?.email}
            </Text>
          </div>
        </Grid.Col>
        <Grid.Col span={2}>
          <Group align="center" h={'100%'} justify="center" w={'100%'}>
            <IconChevronRight
              style={{ width: rem(14), height: rem(14) }}
              stroke={1.5}
            />
          </Group>
        </Grid.Col>
      </Grid>
    </UnstyledButton>
  );
};

export default ToggleButton;
