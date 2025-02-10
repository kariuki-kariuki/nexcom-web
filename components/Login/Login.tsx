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
  Stack,
  Text
} from '@mantine/core';
import classes from './Login.module.css';
import Link from 'next/link';
import SimpleHeader from '../SimpleHeader/SimpleHeader';
import { useGlobalContext } from '@/lib/context/appContext';
import { datasource } from '@/lib/common/datasource';
import setToken from '@/utils/setToken';
import { useRouter } from 'next/navigation';

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setIsLoggedIn } = useGlobalContext();
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    const { data, error, loading } = await datasource.post<{ token: string }>({ formData: loginData, path: 'auth/login' })

    if (!error && !loading && data) {
      await setToken(data.token).then(() => {
        setIsLoggedIn(false);
        router.push('/chat')
      });
      setLoading(false);
    }

    if (error && !loading) {
      setError(error);
    }

  }
  return (
    <Box className={classes.main} mih="100vh">
      <LoadingOverlay visible={loading} />
      <SimpleHeader />
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
          <InputWrapper label="" error={error}>
            <Input
              type="password"
              name="password"
              required
              size="xl"
              value={loginData.password}
              onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Password"
              classNames={{ input: classes.input }}
            />
          </InputWrapper>
          <Stack justify="center" gap={"md"} >
            <Text>Don't have an account? <Link href="/auth/signup" className='text-blue-700 hover:text-gray-500'>Signup.</Link></Text>
            <Button type="submit" size="lg" radius="xl" color="coco.0" onClick={handleSubmit}>
              Login
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Login;
