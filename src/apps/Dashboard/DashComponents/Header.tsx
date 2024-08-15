import { Card, Group, Paper, Text } from '@mantine/core';
import UserButton from './UserButton';
import { ActiveProps } from '../Navbar';
import { IconMenu } from '@tabler/icons-react';
import MenuDrop from '../../../index/MenuDrop';

import classes from './Styles.module.css';

const Header = ({ setActive }: ActiveProps) => {
  return (
    <Group className={classes.header} justify='space-between' p={'lg'}>
      <Card bg={'none'}>
        <Text ff={'heading'}>My dashboard</Text>
        <Text fz={'xs'}>Welcome to Coco Dashboard</Text>
      </Card>
      <Paper bg='none' visibleFrom='sm'>
        <MenuDrop />
      </Paper>
      <Paper hiddenFrom='sm' onClick={() => setActive()}>
        <IconMenu />
      </Paper>
    </Group>
  );
};

export default Header;
