'use client';

import { IconSunFilled, IconSunMoon } from '@tabler/icons-react';
import { Paper, useMantineColorScheme } from '@mantine/core';
import classes from './ColorShemeToggle.module.css';

export function ColorSchemeToggle() {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <Paper className={classes.link} onClick={toggleColorScheme}>
      {colorScheme === 'dark' ? (
        <IconSunFilled className={classes.linkIcon} stroke={1.5} />
      ) : (
        <IconSunMoon className={classes.linkIcon} stroke={1.5} />
      )}
      <span>{colorScheme === 'dark' ? 'light' : 'Dark'}</span>
    </Paper>
  );
}
