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

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const {setIsLoggedIn} = useGlobalContext()
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    const { data, error, loading} = await datasource.post<{token: string}>({formData: loginData, path: 'auth/login'})

    if(!error && !loading && data) {
      setToken(data.token);
      setLoading(false);
      setIsLoggedIn(true);
    }

    if(error && !loading){
      setError(error);
    }

  }
  return (
    <Box className={classes.main} mih="100vh">
      <LoadingOverlay />
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
              />
            </InputWrapper>
            <InputWrapper label="" error={error}>
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
      </Flex>
    </Box>
  );
}

export default Login;
