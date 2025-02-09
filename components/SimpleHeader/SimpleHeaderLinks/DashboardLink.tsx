'use client';

import { useGlobalContext } from '@/lib/context/appContext'
import Link from 'next/link';
import React from 'react';
import classes from './SimpleHeaderLinks.module.css';
const DashboardLink = () => {
  const { user } = useGlobalContext();
  return (
    <div>
      {user?.shop && <Link href='/dashboard' className={classes.link}>Dashboard</Link>}
    </div>
  )
}

export default DashboardLink