import { Avatar, Flex, Group, Paper, Text } from '@mantine/core';
import img from '../../assets/mklogo.png';
import {
  IconCoin,
  IconLayoutDashboardFilled,
  IconMessage2Heart,
  IconSubmarine,
  IconUser,
  IconX,
} from '@tabler/icons-react';
import MenuDrop from '../../index/MenuDrop';
import classes from "./Dashboard.module.css";
const links = [
  { name: 'Accounts', icon: IconUser },
  { name: 'Payments', icon: IconCoin },
  { name: 'complains', icon: IconMessage2Heart },
  { name: 'support', icon: IconSubmarine },
];

export interface ActiveProps {
  setActive: () => void;
}
const Navbar = ({ setActive }: ActiveProps) => {
  const navList = links.map((link) => (
    <Group py={'lg'}>
      {<link.icon color="white" />}
      <Text fz="xs" ff={'monospace'}>
        {link.name}
      </Text>
    </Group>
  ));
  return (
    <Paper bg={'none'} radius={'sm'}>
      <Flex
        h={'100vh'}
        bg={'none'}
        p={'lg'}
        direction={'column'}
        align={'center'}
        w={'100%'}
      >
        <Avatar src={img} my={'lg'} />
        <Flex direction={'column'} h="100%" align={'center'} justify={'center'}>
          <div>
            <Group py={'lg'}>
              {<IconLayoutDashboardFilled size={24} />}
              <Text fz="lg" ff={'serif'} c={'white'} fw={'bold'}>
                My Dashboard
              </Text>
            </Group>
            {navList}
          </div>
        </Flex>
        <Paper
          bg={'none'}
          style={{
            position: 'absolute',
            top: 10,
            right: 0,
            padding: 20,
          }}
          onClick={() => setActive()}
          hiddenFrom="sm"
        >
          <IconX />
        </Paper>
        <Paper hiddenFrom="sm" bg={'none'}>
          <MenuDrop />
        </Paper>
      </Flex>
    </Paper>
  );
};

export default Navbar;
