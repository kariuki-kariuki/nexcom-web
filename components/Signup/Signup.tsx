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

function SignUp() {
  const [state, formAction] = useFormState(SignupPost, { error: '' });
  const [password, setPassword] = useState('');
  return (
    <Box className={classes.main} mih="100vh">
      <Card shadow="lg" className={classes.card}>
        <Group justify="start">
          <Avatar src="/logos/logo.png" />
          <Text py="sm">Nexcom</Text>
        </Group>
      </Card>
      <Flex align="center" h="70vh" justify="center">
        <form action={formAction}>
          <Stack gap="lg" align="center">
            <Group justify="start" mb="xl">
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
            <Group justify="center">
              <Button type="submit" size="lg" radius="xl" color="coco.0">
                SignUp
              </Button>
            </Group>
          </Stack>
        </form>
      </Flex>
    </Box>
  );
}

export default SignUp;
