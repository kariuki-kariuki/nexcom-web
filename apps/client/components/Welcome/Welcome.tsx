'use client';
import Link from 'next/link';
import { Box, Button, Group, Paper, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';
import SimpleHeader from '../SimpleHeader/SimpleHeader';
import useSound from 'use-sound';

export function Welcome() {
  const [play] = useSound('/sounds/message.mp3');
  const [playFx] = useSound('/sounds/level-up.mp3');
  return (
    <div className={classes.bg}>
      <SimpleHeader />
      <div className={classes.main}>
        <section className={classes.section}>
          <Title c="coco.5" className={classes.title} ta="center" mt={100}>
            Welcome to{' '}
            <Text
              inherit
              variant="gradient"
              component="span"
              gradient={{ from: 'orange', to: 'yellow' }}
            >
              Nex
            </Text>
            com 
          </Title>
          <Text ta="center" size="lg" className={classes.description} maw={580} mx="auto" mt="xl">
            The Future of Connected Commerce.
          </Text>
          <Group justify="center" mt="xl">
            <Link href='/business/product'>
              <Button size="lg" color="coco.0" radius="xl" fw="bold" onClick={() => play()}>
                Start Shopping
              </Button>
            </Link>
             <Link href='/chat'>
              <Button size="lg" color="coco.4" radius="xl" fw="bold" onClick={() => play()}>
                Start Charting
              </Button>
            </Link>
          </Group>
        </section>
      </div>
    </div>
  );
}
