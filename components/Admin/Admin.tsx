'use client'
import { useState } from 'react';
import { UsersTable } from './Tables/UserTable/UserTable';
import { Box, Flex } from '@mantine/core';
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
    <Box h={'100vh'} className={classes.admin}>
      <Flex
        h={'100%'}
        direction={'column'}
        className={classes.flex}
      >
        <Header active={active} setActive={setActive} />
        <div className={classes.scroll}>
          <Flex direction={{ base: 'column', sm: 'row'}} gap={'md'}>
            <Box w={{ base: '100%', sm: '50%' }}>
              <StatsGrid />
              <StatsBar />
              <StatsSegments />
              <UsersTable />
              <StatsChart />
            </Box >
            <Box 
              w={{ base: '100%', sm: '50%' }}
            >
              <StatsChart />
              <UsersTable />
              <StartLine />
              <StatsSegments />
              <AdminCalendar />
            </Box >
          </Flex>
        </div>
      </Flex>
    </Box>
  );
}

export default Admin;
