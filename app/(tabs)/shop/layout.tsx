import { NavbarNested } from '@/components/Shop/ShopNav/NavbarNested';
import { Category } from '@/lib/@types/shop';
import { datasource } from '@/lib/common/datasource';
import { Box, Flex, LoadingOverlay } from '@mantine/core';
import React, { ReactNode } from 'react'
import classes from './styles.module.css';
const ShopLayout = async ({ children }: { children: ReactNode }) => {
  const { data, loading } = await datasource.get<Category[]>('categories');
  const all: Category = { id: 0, name: 'All'} 

    return (
        <Flex className={classes.main} direction={{ base: 'column', sm: 'row'}}>
            <Box w={{base: '100%', sm: '20%' }}>
                { data && <NavbarNested categories={[all, ...data]} />}
                {loading && <LoadingOverlay visible={loading}/>}
            </Box>
            <Box w={{base: '100%', sm: '80%'}}>
            {children}</Box>
        </Flex>
    )
}

export default ShopLayout;