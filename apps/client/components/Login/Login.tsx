'use client';

import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Input,
  InputWrapper,
  LoadingOverlay,
  PasswordInput,
  Stack,
  Text
} from '@mantine/core';
import classes from './Login.module.css';
import Link from 'next/link';
import { datasource } from '@/lib/common/datasource';
import setToken from '@/utils/setToken';
import { useRouter } from 'next/navigation';
import { AuthResponse } from '@/lib/@types/app';
import { useGlobalStore } from '@/lib/context/global-store.provider';

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const setUser = useGlobalStore(state => state.setUser)
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    const { data, error, loading } = await datasource.post<AuthResponse>({ formData: loginData, path: 'auth/login' })

    if (!error && !loading && data) {
      await setToken(data.token).then(() => {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setLoading(false);
        router.push('/chat')
      });

    }

    if (error && !loading) {
      setError(error);
    }
    setLoading(false);
  }
  return (
    <Box className={classes.main} mih="100%">
      <LoadingOverlay visible={loading} />
      <Flex align="center" h="70vh" justify="center">
        <Stack gap="lg" align="center">
          <Group justify="start" mb="xl">
            <Avatar size="lg" src="/logos/logo.png" />
            <Text py="sm">Login</Text>
          </Group>
          <InputWrapper label="" error={error}>
            <Input
              type="email"
              name="email"
              required
              size="xl"
              placeholder="Email"
              classNames={{ input: classes.input }}
              value={loginData.email}
              onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
            />
          </InputWrapper>
          <PasswordInput
            required
            w={'100%'}
            size="xl"
            value={loginData.password}
            onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
            placeholder="Password"
            classNames={{ input: classes.input }}
          />
          <Stack justify="center" gap={"md"} >
            <Text>Don't have an account? <Link href="/auth/signup">Signup.</Link></Text>
            <Button type="submit" size="lg" radius="xl" className={classes.btn} onClick={handleSubmit}>
              Login
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Login;
