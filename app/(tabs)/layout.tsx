import TabsNavigation from '@/components/TabsNavigation/TabsNavigation';
import { Box, Flex } from '@mantine/core';
import React, { ReactNode } from 'react'

const TabLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>{children}</>
    )
}

export default TabLayout;