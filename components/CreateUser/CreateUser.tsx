'use client';

import { useFormState } from 'react-dom';
import {
  Button,
  Card,
  Group,
  PasswordInput,
  Text,
  TextInput
} from '@mantine/core';
import SimpleRoute from '../SimpleRoute/SimpleRoute';
import post from './post';
import classes from './CreateUser.module.css';

export function CreateUser() {
  const [state, formAction] = useFormState(post, { error: '' });
  return (
    <div className={classes.wrapper}>
      <SimpleRoute main="Users" tag="Create new user" />
      <Card className={classes.form} radius="md" shadow="xl" p={30}>
        <form action={formAction}>
          <Group wrap="nowrap" py="md">
            <TextInput
              label="First Name"
              placeholder="First Name"
              name="firstName"
              required
              size="lg"
            />
            <TextInput
              label="Last Name"
              placeholder="Last Name"
              name="lastName"
              required
              size="lg"
            />
          </Group>
          <TextInput
            label="Email address"
            type="email"
            name="email"
            required
            placeholder="hello@gmail.com"
            size="lg"
          />
          <PasswordInput
            label="Password"
            type="password"
            name="password"
            required
            placeholder="Password"
            mt="md"
            size="lg"
          />
          {state.error && <Text c="red.9">{state.error}</Text>}
          <Group py="md" justify="center">
            <Button size="lg" bg="scode.8" radius="xl" type="submit">
              Create new User
            </Button>
          </Group>
        </form>
      </Card>
    </div>
  );
}
