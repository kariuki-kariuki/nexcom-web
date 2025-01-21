import Link from 'next/link';
import { Box, Button, Group, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';
import { GlobalUser } from '@/lib/@types/app';
import { redirect } from 'next/navigation';

export function Welcome({ user }: { user: GlobalUser | null }) {
  return (
    <div className={classes.bg}>
      <Box className={classes.main}>
        <section className={classes.section}>
          <Title className={classes.title} ta="center" mt={100}>
            Welcome to{' '}
            <Text
              inherit
              variant="gradient"
              component="span"
              gradient={{ from: 'green', to: 'yellow' }}
            >
              Nex
            </Text>
            Com
          </Title>
          <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
            The Future of Connected Commerce.
          </Text>
          <Group justify="center" mt="xl">
            <Link href={user ? '/chat' : '/auth/login'}>
              <Button size="xl" color="coco.0" radius="xl" fw="bold">
                Get Started
              </Button>
            </Link>
          </Group>
        </section>
      </Box>
    </div>
  );
}
