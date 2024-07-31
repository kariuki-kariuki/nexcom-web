import { Card, Group, Paper, Text } from '@mantine/core';
import UserButton from './UserButton';
import { ActiveProps } from '../Navbar';
import { IconMenu } from '@tabler/icons-react';

const Header = ({ setActive }: ActiveProps) => {
  return (
    <Group bg={'black'} justify="space-between" p={'lg'}>
      <Card bg={'none'}>
        <Text ff={'heading'}>My dashboard</Text>
        <Text fz={'xs'}>Welcome to Coco Dashboard</Text>
      </Card>
      <Paper bg="none" visibleFrom="sm">
        <UserButton />
      </Paper>
      <Paper hiddenFrom="sm" onClick={() => setActive()}>
        <IconMenu />
      </Paper>
    </Group>
  );
};

export default Header;
