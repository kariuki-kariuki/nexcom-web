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
import classes from './Signup.module.css';
import PasswordStrength from './PasswordStrenght';
import Link from 'next/link';
import { datasource } from '@/lib/common/datasource';
import setToken from '@/utils/setToken';
import { useRouter } from 'next/navigation';
import { AuthResponse } from '@/lib/@types/app';
import { useGlobalStore } from '@/lib/context/global-store.provider';

export interface IDetails {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

function SignUp() {
  const setUser = useGlobalStore(state => state.setUser)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    const { data, error } = await datasource.post<AuthResponse>({ formData: details, path: 'auth/register' })

    if (!error && data && !loading) {
      await setToken(data.token).then(() => {
        setUser(data.user)
        router.push('/chat')
        setLoading(false)
      })

    }
    if (error) {
      setError(error)
      setLoading(false)
    }
    setLoading(false)
  }
  return (
    <Box className={classes.main} mih="100%">
      <LoadingOverlay visible={loading} />
      <Flex align="center" h="fit-content" pt="md" justify="center">
        <Stack gap="lg" align="center">
          <Group justify="start" mb="md">
            <Avatar size="lg" src="/logos/logo.png" />
            <Text py="sm">SignUp</Text>
          </Group>
          <InputWrapper label="" error={error}>
            <Input
              type="text"
              name="firstName"
              required
              size="xl"
              placeholder="First name"
              value={details.firstName}
              onChange={(e) => setDetails(prev => ({ ...prev, firstName: e.target.value }))}
              classNames={{ input: classes.input }}
            />
          </InputWrapper>
          <InputWrapper label="" error={error}>
            <Input
              type="text"
              name="lastName"
              required
              size="xl"
              value={details.lastName}
              onChange={(e) => setDetails(prev => ({ ...prev, lastName: e.target.value }))}
              placeholder="Last name"
              classNames={{ input: classes.input }}
            />
          </InputWrapper>
          <InputWrapper label="" error={error}>
            <Input
              type="email"
              name="email"
              required
              size="xl"
              placeholder="Email"
              value={details.email}
              onChange={(e) => setDetails(prev => ({ ...prev, email: e.target.value }))}
              classNames={{ input: classes.input }}
            />
          </InputWrapper>
          <PasswordStrength value={details.password} setPassword={setDetails} />
          <Stack justify="center" gap={"md"}>
            <Text>Have an account? <Link href="/auth/login" className='text-blue-700 hover:text-gray-500'>Login.</Link></Text>

            <Button type="submit" size="lg" radius="xl" color="coco.0" onClick={handleSubmit}>
              SignUp
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Box>
  );
}

export default SignUp;
