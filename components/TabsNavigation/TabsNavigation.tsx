'use client';

import { useGlobalContext } from '@/lib/context/appContext';
import { Flex, Stack } from '@mantine/core';
import { IconDiamond, IconLogout, IconMessage, IconShoppingCart } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import classes from './TabsNavigation.module.css'
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import logout from '@/utils/logout';
import { useGlobalStore } from '@/lib/context/global-store.provider';

function TabsNavigation() {
    const { user } = useGlobalContext();
    const pathname = usePathname();
    const setConversations = useGlobalStore((store) => store.setConversations)


    const getPathName = (route: string) => {
        return pathname.startsWith(route)
    };

    return (
        <Flex direction={"column"} h='100vh' className={classes.nav}>
            <Stack gap="lg" pt="lg" flex={1}>
                {/* <Avatar src={user?.avatar?.signedUrl} size="lg" alt="User Avatar" /> */}
                <Link href="/chat" className={classes.link} data-active={getPathName('/chat') || undefined} >
                    <IconMessage stroke={1.5} className={classes.linkIcon} />
                    <span>Chat</span>
                </Link>
                <Link href="/shop" className={classes.link} data-active={getPathName('/shop') || undefined}>
                    <IconShoppingCart stroke={1.5} className={classes.linkIcon} />
                    <span>Shop</span>

                </Link>
                {user?.shop && (
                    <Link href="/dashboard" className={classes.link} data-active={getPathName('/dashboard') || undefined}>
                        <IconDiamond stroke={1.5} className={classes.linkIcon} />
                        <span>Dashboard</span>

                    </Link>
                )}
            </Stack>
            <Stack gap={"md"} justify='center'>
                <ColorSchemeToggle />

                <a
                    href="#"
                    className={classes.link}
                    onClick={(event) => {
                        event.preventDefault();
                        logout();
                        setConversations([])
                    }}
                >
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </Stack>
        </Flex>


    );
}

export default TabsNavigation;
