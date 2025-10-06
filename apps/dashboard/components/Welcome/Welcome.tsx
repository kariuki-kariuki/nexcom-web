'use client';
import Link from 'next/link';
import { Box, Button, Group, Paper, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';
import SimpleHeader from '../SimpleHeader/SimpleHeader';
import { AUTH_URL, useGlobalStore } from '@repo/shared-logic';

export function Welcome() {
  const user = useGlobalStore((state) => state.user)
  return (
    <div className={classes.bg}>
      <SimpleHeader />
      <div className={classes.main}>
        <section className={classes.section}>
          <Title c="coco.5" className={classes.title} ta="center" mt={100}>
            
            <Text
              inherit
              variant="gradient"
              component="span"
              gradient={{ from: 'orange', to: 'yellow' }}
            >
              Nex
            </Text>
            com Dashboard
          </Title>
          <Text ta="center" size="lg" className={classes.description} maw={580} mx="auto" mt="xl">
            Manage Your Resources Like A Pro
          </Text>
          <Group justify="center" mt="xl">
             <Link href={ user ? '/dashboard' : `${AUTH_URL}`}>
              <Button size="lg" color="coco.4" radius="xl" fw="bold">
                Continue
              </Button>
            </Link>
          </Group>
        </section>
      </div>
    </div>
  );
}
