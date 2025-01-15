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

function Login() {
  const [state, formAction] = useFormState(loginSSR, { error: '' });
  return (
    <Box className={classes.main} mih="100vh">
      <Card shadow="lg" className={classes.card}>
        <Group justify="start">
          <Avatar src="/logos/logo.png" />
          <Text py="sm">Scode</Text>
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
            <Group justify="center">
              <Button type="submit" size="lg" radius="xl" color="scode.8">
                Login
              </Button>
            </Group>
          </Stack>
        </form>
      </Flex>
    </Box>
  );
}

export default Login;
