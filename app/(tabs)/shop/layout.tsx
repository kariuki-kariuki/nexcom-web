import { NavbarNested } from '@/components/Shop/ShopNav/NavbarNested';
import { Category } from '@/lib/@types/shop';
import { datasource } from '@/lib/common/datasource';
import { Box, Flex, LoadingOverlay } from '@mantine/core';
import React, { ReactNode } from 'react'
import classes from './styles.module.css';

const ShopLayout =  ({ children }: { children: ReactNode }) => {

    return (
        <Flex className={classes.main} direction={{ base: 'column', sm: 'row' }}>
            <Box w={{ base: '100%', sm: '20%' }}>
                <NavbarNested />
            </Box>
            <Box w={{ base: '100%', sm: '80%' }}>
                {children}</Box>
        </Flex>
    )
}

export default ShopLayout;