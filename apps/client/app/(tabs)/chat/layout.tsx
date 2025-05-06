'use client';

import React, { ReactNode, useMemo } from 'react';
import classes from './styles.module.css';
import { Paper, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { usePathname } from 'next/navigation';
import ConversationButtonList from '@/components/ConversationButtonList/ConversationButtonList';

const ChatLayout = ({ children }: { children: ReactNode }) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const pathName = usePathname();

  // Memoize to avoid recalculations
  const isHome = useMemo(() => pathName === '/chat', [pathName]);
  return (
    <div className={classes.main}>
      <Paper
        className={mobile ? classes.linksMobile : classes.links}
        data-active={isHome || undefined}
        w={{ base: '100%', sm: '50%', md: '40%', lg: '30%', xl: '25%' }}
      >
        <ConversationButtonList />
      </Paper>
      <div
        className={mobile ? classes.childrenMobile : classes.children}
        data-active={isHome || undefined}
      >
        {children}
      </div>
    </div>
  );
};

export default ChatLayout;
