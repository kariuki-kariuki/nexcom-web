'use client';

import React, { useState } from 'react';
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
import classes from './Signup.module.css';
import SignupPost from './SignupPost';
import PasswordStrength from './PasswordStrenght';
import Link from 'next/link';
import SimpleHeader from '../SimpleHeader/SimpleHeader';
import { useGlobalContext } from '@/lib/context/appContext';
import { datasource } from '@/lib/common/datasource';
import setToken from '@/utils/setToken';
import { useRouter } from 'next/navigation';

export interface IDetails {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

function SignUp() {
 
  const { setIsLoggedIn } = useGlobalContext()
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
    const {data, error} = await datasource.post<{token: string}>({formData: details, path: 'auth/register'})

    if(!error && data){
      await setToken(data.token).then(() =>{
        setIsLoggedIn(false)
      });
      router.push('/chat')
      setLoading(false)
    }
    if(error){
      setError(error)
    }
    setLoading(false)
  }
  return (
    <Box className={classes.main} mih="100vh">
      <SimpleHeader />
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
                onChange={(e) => setDetails(prev => ({...prev, firstName: e.target.value}))}
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
            <PasswordStrength value={details.password} setPassword={setDetails}/>
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
