'use client';

import Link from 'next/link';
import React from 'react';
import classes from './SimpleHeaderLinks.module.css';
import { IconDiamond } from '@tabler/icons-react';
import { Button, Paper } from '@mantine/core';
import { useGlobalStore } from '@repo/shared-logic';
const DashboardLink = () => {
  const user = useGlobalStore((state) => state.user);
  return (
    <div>
      {user?.shop && <Link href='/dashboard' className={classes.link}><Paper bg="none" hiddenFrom='sm'><IconDiamond className={classes.linkIcon} /></Paper> Dashboard</Link>}
    </div>
  )
}

export default DashboardLink

export const LoginLink = () => {
  const user = useGlobalStore((state) => state.user);
  return (
    <div>
      {!user && <Link href='/auth/login' className={classes.link}>
        <Button size='xl'>
          Login
        </Button>
      </Link>}
    </div>
  )
}

