import { useState } from 'react';
import { NavbarSearch } from './AdminNav/NavbarSearch';
import { UsersTable } from './Tables/UserTable';
import { Box, Flex, Grid, ScrollArea } from '@mantine/core';
import { StatsGrid } from './components/StatsGrid';
import Header from './components/Header';
import StatsChart from './components/StatsChart';
import StatsBar from './components/StatsBar';
import { StatsSegments } from './components/StatsSegments';
import { StartLine } from './components/StartLine';
import AdminCalendar from './components/AdminCalendar';

function Admin() {
  const [active, setActive] = useState(false);
  return (
    <Box bg={'coco.1'} h={'100vh'} p={0}>
      <Flex h={'100%'}>
        <Box w={{ base: '100%', sm: '30%', md: '25%' }} visibleFrom="sm">
          <NavbarSearch active={active} setActive={setActive} />
        </Box>
        <Box w={{ base: '100%', sm: '70%', md: '75%' }} p={{ sm: 'md'}}>
          <Header />
          <ScrollArea h={'100%'} p={{sm:'md', md: 'md'}} w={"100%"}>
            <Grid>
              <Grid.Col span={{base: 12, sm: 12, md: 6}}>
                <StatsGrid />
                <StatsBar />
                <StatsSegments />
                <UsersTable  />
              </Grid.Col>
              <Grid.Col span={{base: 12, sm: 12, md: 6}} p={'md'}>
                <StatsChart />
                <UsersTable  />
                <StartLine />
                <StatsSegments />
                <AdminCalendar />
              </Grid.Col>
            </Grid>
          </ScrollArea>
        </Box>
      </Flex>
    </Box>
  );
}

export default Admin;
