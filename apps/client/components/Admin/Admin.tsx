'use client'
import { useState } from 'react';
import { UsersTable } from './Tables/UserTable/UserTable';
import { Box, Card, Flex, Group, Text } from '@mantine/core';
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
          <StatsGrid />
          <Flex wrap="wrap" justify="space-between" gap="md">
            <StartLine />
            <UsersTable />
            <StatsBar />
            <StatsSegments />
          </Flex>
        </div>
      </Flex>
    </Box>
  );
}

export default Admin;
