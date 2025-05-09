'use client';
import Link from 'next/link';
import { Box, Button, Group, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';
import SimpleHeader from '../SimpleHeader/SimpleHeader';
import useSound from 'use-sound';

export function Welcome() {
  const [play] = useSound('/sounds/message.mp3');
  const [playFx] = useSound('/sounds/level-up.mp3');
  return (
    <div className={classes.bg}>
      <SimpleHeader />
      <Box className={classes.main}>
        <section className={classes.section}>
          <Title className={classes.title} ta="center" mt={100}>
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
          <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
            The Future of Connected Commerce.
          </Text>
          <Group justify="center" mt="xl">
            <Link href='/business/product'>
              <Button size="xl" color="coco.0" radius="xl" fw="bold" onClick={() => play()}>
                Get Started
              </Button>
            </Link>
          </Group>
        </section>
      </Box>
    </div>
  );
}
