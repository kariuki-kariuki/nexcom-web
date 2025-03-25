import React, { ReactNode } from 'react'
import classes from './EmptyState.module.css';
import { Button, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import SimpleHeader from '../SimpleHeader/SimpleHeader';

interface Iprops {
  message: string;
  actionUrl: string;
  actionText: string; // action to perfom
  icon: ReactNode;
}
const EmptyState = ({ message, actionText, actionUrl, icon }: Iprops) => {
  return (
    <div className={classes.main}>
      <SimpleHeader />
      <div className={classes.inner}>
        <Stack className={classes.content} align='center'>
          <Text>{message}</Text>
          <div>
            {icon}
          </div>
          <Link href={actionUrl}>
            <Button>{actionText}</Button>
          </Link>
        </Stack>
      </div>

    </div>
  )
}

export default EmptyState