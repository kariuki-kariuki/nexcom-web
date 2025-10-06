'use client';

import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Flex,
  Input,
  InputWrapper,
  LoadingOverlay,
  Paper,
  Stack,
  Text
} from '@mantine/core';
import classes from './Signup.module.css';
import PasswordStrength from './PasswordStrength';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { datasource } from '@repo/shared-logic';
import { AuthResponse } from "@repo/nexcom-types"
import { setToken } from '@repo/shared-logic/src/utils/setToken';

export interface IDetails {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

function SignUp() {
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
    <Paper className={classes.main} mih="100vh">
      <LoadingOverlay visible={loading} />
      <Flex align="center"  p={0} h="100vh" justify="end" className={classes.flex}>
        <Card withBorder shadow='lg' h="100%" w={{ base: "100%", xs: "70%", md: "35%", lg: "25%"}} py="xl" className={classes.card}>
          <Stack gap="lg" align="center">
            <Stack justify="center" mb="md">
              <Avatar size="lg" src="/logos/logo.png" />
              <Text fw="bold" c="coco.5">SignUp</Text>
            </Stack>
            <InputWrapper w="100%" label="" error={error}>
              <Input
                type="text"
                name="firstName"
                required
                size="lg"
                placeholder="First name"
                value={details.firstName}
                onChange={(e) => setDetails(prev => ({ ...prev, firstName: e.target.value }))}
                classNames={{ input: classes.input }}
              />
            </InputWrapper>
            <InputWrapper w="100%" label="" error={error}>
              <Input
                type="text"
                name="lastName"
                required
                size="lg"
                value={details.lastName}
                onChange={(e) => setDetails(prev => ({ ...prev, lastName: e.target.value }))}
                placeholder="Last name"
                classNames={{ input: classes.input }}
              />
            </InputWrapper>
            <InputWrapper w="100%" label="" error={error}>
              <Input
                type="email"
                name="email"
                required
                size="lg"
                placeholder="Email"
                value={details.email}
                onChange={(e) => setDetails(prev => ({ ...prev, email: e.target.value }))}
                classNames={{ input: classes.input }}
              />
            </InputWrapper>
            <PasswordStrength value={details.password} setPassword={setDetails} />
            <Stack justify="center" gap={"md"}>
              <Text>Have an account? <Link href="/login" className='text-blue-700 hover:text-gray-500'>Login.</Link></Text>

              <Button type="submit" size="lg" radius="lg" color="coco.5" onClick={handleSubmit}>
                SignUp
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Flex>
    </Paper>
  );
}

export default SignUp;
