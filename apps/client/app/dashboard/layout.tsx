import SimpleRoute from '@/components/SimpleRoute/SimpleRoute';
import { Container } from '@mantine/core';
import React, { ReactNode } from 'react';
import classes from "./styles.module.css"
export const metadata = {
  title: 'Dashboard @ Nexcom',
  description: 'Main Page Manage Your shop Effortlessly'
};

interface PageProps {
  children: ReactNode;
}

export default function RootLayout({ children }: PageProps) {
  return (
    <div className={classes.main}>
      <SimpleRoute />
      <Container size="xl" p="sm" className={classes.container}>
        {children}
      </Container>
    </div>
  );
}
