'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Input,
  InputWrapper,
  Stack,
  Text
} from '@mantine/core';
import classes from './Login.module.css';
import loginSSR from './loginssr';
import Link from 'next/link';

function Login() {
  const [state, formAction] = useFormState(loginSSR, { error: '' });
  return (
    <Box className={classes.main} mih="100vh">
      <Card shadow="lg" className={classes.card}>
        <Group justify="start">
          <Avatar src="/logos/logo.png" />
          <Text py="sm">Nexcom</Text>
        </Group>
      </Card>
      <Flex align="center" h="70vh" justify="center">
        <form action={formAction}>
          <Stack gap="lg" align="center">
            <Group justify="start" mb="xl">
              <Avatar size="lg" src="/logos/logo.png" />
              <Text py="sm">Login</Text>
            </Group>
            <InputWrapper label="" error={state.error}>
              <Input
                type="email"
                name="email"
                required
                size="xl"
                placeholder="Email"
                classNames={{ input: classes.input }}
              />
            </InputWrapper>
            <InputWrapper label="" error={state.error}>
              <Input
                type="password"
                name="password"
                required
                size="xl"
                placeholder="Password"
                classNames={{ input: classes.input }}
              />
            </InputWrapper>
            <Stack justify="center" gap={"md"} >
              <Text>Don't have an account? <Link href="/auth/signup" className='text-blue-700 hover:text-gray-500'>Signup.</Link></Text>
              <Button type="submit" size="lg" radius="xl" color="coco.0">
                Login
              </Button>
            </Stack>
          </Stack>
        </form>
      </Flex>
    </Box>
  );
}

export default Login;
