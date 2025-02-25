import { useState } from 'react';
import { NavbarSearch } from './AdminNav/NavbarSearch/NavbarSearch';
import { UsersTable } from './Tables/UserTable/UserTable';
import { Box, Flex, Grid, ScrollArea } from '@mantine/core';
import { StatsGrid } from './components/StatsGrid/StatsGrid';
import Header from './components/Header/Header';
import StatsChart from './components/StatsChart/StatsChart';
import StatsBar from './components/StatsBar/StatsBar';
import { StatsSegments } from './components/StatsSegments/StatsSegments';
import { StartLine } from './components/StartLine/StartLine';
import AdminCalendar from './components/AdminCalendar/AdminCalendar';
import classes from './Admin.module.css';

function Admin() {
  const [active, setActive] = useState(false);
  return (
    <Box h={'100vh'} p={{ sm: 'lg' }} className={classes.admin}>
      <Flex h={'100%'} gap={'sm'}>
        <Box
          w={{ base: '100%', sm: '30%', md: '25%' }}
          visibleFrom="sm"
          h={'100%'}
        >
          <NavbarSearch active={active} setActive={setActive} />
        </Box>
        <Flex
          w={{ base: '100%', sm: '70%', md: '75%' }}
          h={'100%'}
          direction={'column'}
          className={classes.flex}
        >
          <Header active={active} setActive={setActive} />
          <ScrollArea w={'100%'} h={'100%'} type="never">
            <Grid>
              <Grid.Col span={{ base: 12, sm: 12, md: 6 }}>
                <StatsGrid />
                <StatsBar />
                <StatsSegments />
                <UsersTable />
                <StatsChart />
              </Grid.Col>
              <Grid.Col
                span={{ base: 12, sm: 12, md: 6 }}
                p={'md'}
                className={classes.scroll}
              >
                <StatsChart />
                <UsersTable />
                <StartLine />
                <StatsSegments />
                <AdminCalendar />
              </Grid.Col>
            </Grid>
          </ScrollArea>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Admin;
