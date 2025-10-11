import { NavbarSearch } from '@/components/Admin/AdminNav/NavbarSearch/NavbarSearch';
import SimpleRoute from '@/components/SimpleRoute/SimpleRoute';
import { Flex, Paper } from '@mantine/core';
import React from 'react'

interface PageProps {
    children: React.ReactNode;
}
const DashboardLayout = ({ children }: PageProps) => {
    return (
        <Flex direction={{ base: 'column', sm: 'row' }}>
            <Paper bg="none" w={{ base: '100%', xs: "50%", sm: "40%", md: "30%", lg: "20%" }}>
                <NavbarSearch />
            </Paper>
            <Paper bg="none" w={{ base: "100%", xs: "50%", sm: "60%", md: "70%", lg: '80%' }} h="100vh" style={{ overflowY: "scroll" }}>
                <SimpleRoute />
                {children}
            </Paper>
        </Flex>
    )
}

export default DashboardLayout