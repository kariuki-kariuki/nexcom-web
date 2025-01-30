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

function SignUp() {
  const [state, formAction] = useFormState(SignupPost, { error: '' });
  const { setIsLoggedIn } = useGlobalContext()
  const [password, setPassword] = useState('');
  return (
    <Box className={classes.main} mih="100vh">
      <SimpleHeader />
      <Flex align="center" h="fit-content" pt="md" justify="center">
        <form action={(e) => {formAction(e); setIsLoggedIn(false)}}>
          <Stack gap="lg" align="center">
            <Group justify="start" mb="md">
              <Avatar size="lg" src="/logos/logo.png" />
              <Text py="sm">SignUp</Text>
            </Group>
            <InputWrapper label="" error={state.error}>
              <Input
                type="text"
                name="firstName"
                required
                size="xl"
                placeholder="First name"
                classNames={{ input: classes.input }}
              />
            </InputWrapper>
            <InputWrapper label="" error={state.error}>
              <Input
                type="text"
                name="lastName"
                required
                size="xl"
                placeholder="Last name"
                classNames={{ input: classes.input }}
              />
            </InputWrapper>
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
            <PasswordStrength value={password} setPassword={setPassword}/>
            <Stack justify="center" gap={"md"}>
              <Text>Have an account? <Link href="/auth/login" className='text-blue-700 hover:text-gray-500'>Login.</Link></Text>

              <Button type="submit" size="lg" radius="xl" color="coco.0">
                SignUp
              </Button>
            </Stack>
          </Stack>
        </form>
      </Flex>
    </Box>
  );
}

export default SignUp;
