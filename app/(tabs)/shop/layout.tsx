import { NavbarNested } from '@/components/Shop/ShopNav/NavbarNested';
import { Category } from '@/lib/@types/shop';
import { datasource } from '@/lib/common/datasource';
import { Box, Flex, LoadingOverlay } from '@mantine/core';
import React, { ReactNode, useState } from 'react'

const ShopLayout = async ({ children }: { children: ReactNode }) => {
  const { data, loading } = await datasource.get<Category[]>('categories');
  const all: Category = { id: 0, name: 'All'} 

    return (
        <Flex>
            <Box visibleFrom='sm' w={'20%' }>
                { data && <NavbarNested categories={[all, ...data]} />}
                {loading && <LoadingOverlay visible={loading}/>}
            </Box>
            <Box w={{base: '100%', sm: '80%'}}>
            {children}</Box>
        </Flex>
    )
}

export default ShopLayout;