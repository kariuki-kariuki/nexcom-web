import { Flex, Drawer, Paper } from '@mantine/core';
import Navbar from './Navbar';
import Hero from './Hero';
import { useDisclosure } from '@mantine/hooks';

const Dashboard = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Paper h={'100vh'} bg={'black'}>
      <Flex direction={'row'} h={'100%'}>
        <Paper bg={'none'} w={{ sm: '30%' }} visibleFrom="sm">
          <Navbar setActive={open} />
        </Paper>

        <Hero setActive={open} />
      </Flex>
      <Drawer
        opened={opened}
        onClose={close}
        hiddenFrom="sm"
        withCloseButton={false}
        padding={'0px'}
        bg={'black'}
        zIndex={10}
        size={'80%'}
        shadow="lg"
      >
        <Navbar setActive={close} />
      </Drawer>
    </Paper>
  );
};

export default Dashboard;
