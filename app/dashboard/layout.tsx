import React, { ReactNode } from 'react';
import { Box } from '@mantine/core';
import { Navbar } from '../../components/Navbar/Navbar';
import classes from './styles.module.css';

export const metadata = {
  title: 'Dashboard @ Nexcom',
  description: 'Main Page'
};

interface PageProps {
  children: ReactNode;
}

export default function RootLayout({ children }: PageProps) {
  return (
    <>
      <Box mih="100vh" className={classes.main}>
        <Box w={{ base: '100%', sm: '20%' }}>
          <Navbar />
        </Box>
        <Box className={classes.secondary}>{children}</Box>
      </Box>
    </>
  );
}
