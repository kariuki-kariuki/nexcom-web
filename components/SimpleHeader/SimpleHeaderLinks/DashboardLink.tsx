'use client';

import { useGlobalContext } from '@/lib/context/appContext'
import Link from 'next/link';
import React from 'react';
import classes from './SimpleHeaderLinks.module.css';
import { IconDiamond } from '@tabler/icons-react';
import { Paper } from '@mantine/core';
const DashboardLink = () => {
  const { user } = useGlobalContext();
  return (
    <div>
      {user?.shop && <Link href='/dashboard' className={classes.link}><Paper bg="none" hiddenFrom='sm'><IconDiamond className={classes.linkIcon} /></Paper> Dashboard</Link>}
    </div>
  )
}

export default DashboardLink

export const LoginLink = () => {
  const { user } = useGlobalContext();
  return (
    <div>
      {!user && <Link href='/auth/login' className={classes.link}>Login</Link>}
    </div>
  )
}

