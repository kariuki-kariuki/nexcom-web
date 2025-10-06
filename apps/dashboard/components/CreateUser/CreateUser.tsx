'use client';

import {
  Button,
  Card,
  Group,
  PasswordInput,
  Text,
  TextInput
} from '@mantine/core';
import post from './post';
import classes from './CreateUser.module.css';

export function CreateUser() {
  return (
    <div className={classes.wrapper}>
      <Card className={classes.form} radius="md" shadow="xl" p={30}>
        <form>
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
          <Group py="md" justify="center">
            <Button size="lg" bg="coco.0" radius="xl" type="submit">
              Create new User
            </Button>
          </Group>
        </form>
      </Card>
    </div>
  );
}
