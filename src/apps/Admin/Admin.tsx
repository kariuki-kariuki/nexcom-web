import { useState } from 'react';
import { NavbarSearch } from './AdminNav/NavbarSearch';
import Demo from './Tables/Pagination';
import { UsersTable } from './Tables/UserTable';
import { Box, Flex, Grid, Group, ScrollArea } from '@mantine/core';
import { StatsGrid } from './components/StatsGrid';
import Header from './components/Header';
import StatsChart from './components/StatsChart';

function Admin() {
  const [activePage, setPage] = useState<number>(1);
  const [active, setActive] = useState(false);
  return (
    <Box bg={'coco.1'} h={'100vh'}>
      <Flex h={'100%'}>
        <Box w={{ base: '100%', sm: '30%', md: '25%' }} visibleFrom="sm">
          <NavbarSearch active={active} setActive={setActive} />
        </Box>
        <Box w={{ base: '100%', sm: '70%', md: '75%' }} p={'md'}>
          <Header />
          <ScrollArea h={'100%'} p={'md'}>
            <Grid>
              <Grid.Col span={6}>
                <StatsGrid />
              </Grid.Col>
              <Grid.Col span={6} h={"rem(100%)"} p={"md"}>
                <Group grow  h={"100%"}>
                  <StatsChart />
                  <StatsChart />
                </Group>
              </Grid.Col>
            </Grid>
            <UsersTable activePage={activePage} />
            <Demo setPage={setPage} activePage={activePage} />
          </ScrollArea>
        </Box>
      </Flex>
    </Box>
  );
}

export default Admin;
