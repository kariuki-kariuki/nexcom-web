'use client';

import Link from 'next/link';
import React from 'react';
import classes from './SimpleHeaderLinks.module.css';
import { IconDiamond } from '@tabler/icons-react';
import { Button, Paper } from '@mantine/core';
import { useGlobalStore } from '@/lib/context/global-store.provider';
import { AUTH_URL, DASHBOARD_URL } from '@/lib/common/constants';
const DashboardLink = () => {
  const user = useGlobalStore((state) => state.user);
  return (
    <div>
      {user?.shop && <Link href={`${DASHBOARD_URL}/dashboard`} referrerPolicy="origin" className={classes.link}><Paper bg="none" hiddenFrom='sm'><IconDiamond className={classes.linkIcon} /></Paper> Dashboard</Link>}
    </div>
  )
}

export default DashboardLink

export const LoginLink = () => {
  const user = useGlobalStore((state) => state.user);
  return (
    <div>
      {!user && <Link href={`${AUTH_URL}/login`} referrerPolicy="origin" className={classes.link}>
        <Button size='xl'>
          Login
        </Button>
      </Link>}
    </div>
  )
}

