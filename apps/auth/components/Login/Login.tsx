'use client';

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Input,
  InputWrapper,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Stack,
  Text
} from '@mantine/core';
import classes from './Login.module.css';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { APP_URL, datasource, setToken } from '@repo/shared-logic';
import { AuthResponse } from '../../../../packages/nexcom-types';
import LoginButton from '../LoginButton/LoginButton';

function Login({ searchParams }: {searchParams: string}) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    const { data, error, loading } = await datasource.post<AuthResponse>({ formData: loginData, path: 'auth/login' })

    if (!error && !loading && data) {
      await setToken(data.token).then(() => {
        localStorage.setItem('token', data.token);
        setLoading(false);
        router.push(searchParams ? searchParams : `${APP_URL}`)
      });

    }

    if (error && !loading) {
      setError(error);
    }
    setLoading(false);
  }
  return (
    <Paper className={classes.main} mih="100%">
      <LoadingOverlay visible={loading} />
      <Flex align="center" h="100vh" justify="end" className={classes.flex}>
        <Card withBorder w={{ base: "100%", xs: "70%", md: "35%", lg: "25%"}} shadow='lg' h='100%' radius="0" py="xl" className={classes.card}>
          <Stack justify='center' align='center' mb="lg" w='100%'>
            <Avatar size="lg" src="/logos/logo.png" />
            <Text size='sm' py="sm">Login to manage your account</Text>
          </Stack>
          <Stack gap="lg" align="center">
            <InputWrapper label="" w="100%" error={error}>
              <Input
                type="email"
                name="email"
                required
                size="lg"
                w="100%"
                radius="lg"
                placeholder="Email"
                classNames={{ input: classes.input }}
                value={loginData.email}
                onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
              />
            </InputWrapper>
            <PasswordInput
              required
              w={'100%'}
              size="lg"
              radius="lg"
              value={loginData.password}
              onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Password"
              classNames={{ input: classes.input }}
            />
            <Stack justify="center" gap={"md"} >
              <Text>Don't have an account? <Link href="/signup">Signup.</Link></Text>
              <Button type="submit" size="lg" radius="lg" className={classes.btn} onClick={handleSubmit}>
                Login
              </Button>
            </Stack>
            <Group w="100%" wrap='nowrap'>
              <span className={classes.span}/><Text>Or</Text>
              <span className={classes.span}/>
            </Group>

            <Stack>
              <LoginButton />
            </Stack>
          </Stack>
        </Card>
      </Flex>
    </Paper>
  );
}

export default Login;
