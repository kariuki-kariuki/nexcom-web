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
import classes from "./Admin.module.css"

function Admin() {
  const [active, setActive] = useState(false);
  return (
    <Box  h={'100vh'} p={{sm: 'lg'}} className={classes.admin} >
      <Flex h={'100%'} gap={"sm"}>
        <Box w={{ base: '100%', sm: '30%', md: '25%' }} visibleFrom="sm" >
          <NavbarSearch active={active} setActive={setActive} />
        </Box>
        <Box w={{ base: '100%', sm: '70%', md: '75%' }} py={{ sm: 'md'}} className={classes.flex}>
          <Header />
          <ScrollArea h={'100%'} p={{sm:'md', md: 'md'}} w={"fit-content"} scrollbars="y">
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
