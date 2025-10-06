'use client';
import { Box, Avatar, Stack, useMantineColorScheme, useMantineTheme, Indicator, Paper, Divider } from '@mantine/core';
import { IconSunFilled, IconSunMoon, IconLogout, IconListTree, IconBriefcaseFilled, IconMessageCircleFilled, IconShoppingCartFilled, IconShoppingBagPlus, IconLogin, IconDiamondFilled } from '@tabler/icons-react';
import Link from 'next/link';
import React, { useMemo } from 'react';
import classes from './styles.module.css';
import logout from '@/utils/logout';
import Dashboard from '../Profile/ProfileDashboard';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useGlobalStore } from '@/lib/context/global-store.provider';
import { usePathname, useRouter } from 'next/navigation';
import { MessageState } from '@/lib/common/common';

const defaultLinks = [
  { label: 'Chats', link: '/chat', icon: IconMessageCircleFilled },
  // { label: 'Videos', link: '/videos', icon: IconPlayerPlayFilled },
  { label: 'Business', link: '/business', icon: IconBriefcaseFilled },
  { label: 'Products', link: '/business/product', icon: IconShoppingBagPlus },
];

const dashboardLinks = [
  { link: '/dashboard/products', label: 'Stock', icon: IconListTree },
];

const SimpleNav = () => {
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, { toggle }] = useDisclosure();
  const conversations = useGlobalStore((store) => store.conversations);
  const setConversations = useGlobalStore((store) => store.setConversations);
  const pathName = usePathname();
  const dashboard = pathName.startsWith('/dashboard');
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const unreadConversations = useMemo(() => {
    return conversations.reduce((acc: number, conversation) => {
      const hasUnread = conversation.messages.some(
        message => message.user.id !== user?.id && message.state === MessageState.DELIVERED
      );
      return hasUnread ? acc + 1 : acc;
    }, 0);
  }, [conversations, user?.id]);

  const isChat = useMemo(() => pathName.startsWith('/chat/'), [pathName]);
  const router = useRouter();

  

  return (
    <div className={`${classes.main} ${mobile && isChat ? classes.mobile : ''}`} data-active={isChat || undefined}>
      <Stack justify="space-between" h="100%" align="center" pt="lg">
        <Stack align="center" py="0">
          <Avatar
            src={user?.avatar?.signedUrl}
            onClick={toggle}
            name={user?.fullName}
            style={{ cursor: 'pointer' }}
          />
          {defaultLinks.map((link) => (
            <Link
              href={link.link}
              className={classes.link}
              data-active={pathName.startsWith(link.link) || undefined}
              key={link.link}
            >
              {link.link === '/chat' && unreadConversations > 0 ? (
                <Indicator label={unreadConversations} size={20} color="orange.7" radius={100}>
                  <link.icon stroke={1.5} className={classes.linkIcon} />
                </Indicator>
              ) : (
                <link.icon stroke={1.5} className={classes.linkIcon} />
              )}
            </Link>
          ))}
          <Link
            href="/cart"
            className={classes.link}
            data-active={pathName.startsWith('/cart') || undefined}
            key="/cart"
          >
            <Indicator label={user?.cartItems?.length || 0} size={20} color="orange.7" radius={100}>
              <IconShoppingCartFilled stroke={1.5} className={classes.linkIcon} />
            </Indicator>
          </Link>
        </Stack>
        <Stack gap="md" align="center">
        <Divider w="100%" />
          <Paper
            bg={'none'}
            className={classes.link}
            onClick={toggleColorScheme}
            style={{ cursor: 'pointer' }}
          >
            {colorScheme === 'dark' ? (
              <IconSunFilled className={classes.linkIcon} stroke={1.5} />
            ) : (
              <IconSunMoon className={classes.linkIcon} stroke={1.5} />
            )}
          </Paper>
          <Paper
            component="button"
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();
              if (user) {
                logout();
                setUser(null);
                setConversations([]);
              } else {
                router.push('/auth/login');
              }
            }}
            style={{ cursor: 'pointer', background: 'none', border: 'none' }}
          >
            {user ? (
              <IconLogout color="red" className={classes.linkIcon} stroke={1.5} />
            ) : (
              <IconLogin color="teal" className={classes.linkIcon} stroke={1.5} />
            )}
          </Paper>
        </Stack>
      </Stack>
      {user && <Dashboard opened={opened} toggle={toggle} actUser={user} />}
    </div>
  );
};

export default SimpleNav;