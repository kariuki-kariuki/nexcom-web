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
import SimpleHeader from '../SimpleHeader/SimpleHeader';
import { useGlobalContext } from '@/lib/context/appContext';

function Login() {
  const [state, formAction] = useFormState(loginSSR, { error: '' });
  const {setIsLoggedIn} = useGlobalContext()
  return (
    <Box className={classes.main} mih="100vh">
      <SimpleHeader />
      <Flex align="center" h="70vh" justify="center">
        <form action={(e) => {formAction(e); setIsLoggedIn(false)}}>
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
