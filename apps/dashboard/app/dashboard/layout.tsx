import { NavbarSearch } from '@/components/Admin/AdminNav/NavbarSearch/NavbarSearch';
import { Flex, Paper } from '@mantine/core';
import React from 'react'

interface PageProps {
    children: React.ReactNode;
}
const DashboardLayout = ({ children }: PageProps) => {
    return (
        <div>
            <Flex direction={{ base: 'column', sm: 'row'}} gap={5}>
                <Paper bg="none" w={{ base: '100%', xs: "50%", sm: "40%", md: "30%", lg: "20%"}}>
                    <NavbarSearch />
                </Paper>
                <Paper bg="none" w={{ base: "100%", xs: "50%", sm: "60%", md: "70%", lg: '80%' }}>
                    {children}
                </Paper>
            </Flex>
        </div>
    )
}

export default DashboardLayout