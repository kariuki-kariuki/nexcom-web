'use client';
import { Box, Avatar, Stack, useMantineColorScheme } from '@mantine/core';
import { IconHome, IconShoppingBag, IconShoppingCart, IconMessageCircle, IconDiamond, IconSunFilled, IconSunMoon, IconLogout, IconVideo, IconPlayerPlay, IconListTree } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';
import classes from './styles.module.css';
import { useGlobalContext } from '@/lib/context/appContext';
import logout from '@/utils/logout';
import Dashboard from '../Profile/ProfileDashboard';
import { useDisclosure } from '@mantine/hooks';
import { useGlobalStore } from '@/lib/context/global-store.provider';
import { usePathname } from 'next/navigation';

const defaultLinks = [
  { label: 'Chats', link: '/chat', icon: IconMessageCircle },
  { label: 'Videos', link: '/videos', icon: IconPlayerPlay },
  { label: 'Business', link: '/business', icon: IconShoppingBag },
  { label: 'Products', link: '/business/product', icon: IconShoppingCart },
];

const dashboardLinks = [
  { link: '/dashboard/products', label: 'Stock', icon: IconListTree },
];

const SimpleNav = () => {
  const { user } = useGlobalContext();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, { toggle }] = useDisclosure();
  const setConversations = useGlobalStore((store) => store.setConversations);
  const pathName = usePathname();
  const dashboard = pathName.startsWith('/dashboard');

  // Create links array based on conditions
  const links = React.useMemo(() => {
    let result = [...defaultLinks];
    if (user?.shop) {
      result = [{ label: 'Dashboard', link: '/dashboard', icon: IconDiamond }, ...result];
    }
    if (dashboard) {
      result = [...dashboardLinks, ...result];
    }
    return result;
  }, [user?.shop, dashboard]);

  return (
    <div className={classes.main}>
      <Stack justify='space-between' h="100%" align='center'>
        <Stack gap={"md"} align='center' py="sm">
          <Avatar 
            src={user?.avatar?.signedUrl} 
            onClick={toggle} 
            name={user?.fullName} 
            style={{ cursor: 'pointer' }}
          />
          {links.map((link, idx) => (
            <Link 
              href={link.link} 
              className={classes.link} 
              data-active={pathName.startsWith(link.link) || undefined} 
              key={link.link} // Better to use link as key instead of index
            >
              <link.icon stroke={1.5} className={classes.linkIcon} />
            </Link>
          ))}
        </Stack>
        <Stack gap="md" align="center">
          <Box 
            className={classes.link} 
            onClick={toggleColorScheme}
            style={{ cursor: 'pointer' }}
          >
            {colorScheme === 'dark' ? (
              <IconSunFilled className={classes.linkIcon} stroke={1.5} />
            ) : (
              <IconSunMoon className={classes.linkIcon} stroke={1.5} />
            )}
          </Box>
          <Box
            component="button"
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();
              logout();
              setConversations([]);
            }}
            style={{ cursor: 'pointer', background: 'none', border: 'none' }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
          </Box>
        </Stack>
      </Stack>
      {user && <Dashboard opened={opened} close={toggle} actUser={user} />}
    </div>
  );
};

export default SimpleNav;