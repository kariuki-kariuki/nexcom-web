import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Box,
  Flex,
} from '@mantine/core';
import { GoogleButton } from './GoogleButton';
import { url } from '../../data/url';
import { useNavigate } from 'react-router-dom';
import { HeaderSearch } from '../../components/Navbar/HeaderSearch/HeaderSearch';
import classes from './Login.module.css';
import { useContext } from 'react';
import { AppContext } from '../../context/appContext';
import { UserContextType } from '../../@types/app';

const links = [
  { link: '/', label: 'Home' },
  { link: '/shop', label: 'Shop' },
  { link: '/cart', label: 'Cart' },
];
export default function Login(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);
  const navigate = useNavigate();
  const { updateUser } = useContext(AppContext) as UserContextType;
  const form = useForm({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });
  function getMe(token: string) {
    fetch(`http://192.168.100.16:3000/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          updateUser(res);
        });
      }
    });
  }
  function handleSubmit(values: typeof form.values) {
    console.log(values);
    fetch(`${url}${type == 'login' ? '/auth/login' : '/auth/register'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((res) => {
            localStorage.setItem('token', res.token);
            getMe(res.token);
            navigate('/chat', { replace: true });
          });
        } else {
          res.json().then((res) => console.log(res));
        }
      })
      .catch((err) => alert(err));
  }

  return (
    <Box h={'100vh'}>
      <HeaderSearch links={links} />
      <Flex
        justify="center"
        direction={'column'}
        align="center"
        w={'100%'}
        classNames={{ root: classes.flex }}
      >
        <Paper
          radius="md"
          p="xl"
          bg="rgb(15 23 42 / var(--tw-bg-opacity))"
          withBorder
          {...props}
          className="bg-slate-900 "
        >
          <Text size="lg" fw={500} c="white" ta={'center'}>
            Welcome to COCO, {type} with
          </Text>

          <Group grow mb="md" mt="md">
            <GoogleButton
              radius="xl"
              onClick={() => window.location.replace(`${url}/auth/google`)}
            >
              Google
            </GoogleButton>
          </Group>

          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="lg"
          />

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              {type === 'register' && (
                <TextInput
                  label="First Name"
                  placeholder="Your name"
                  value={form.values.firstName}
                  onChange={(event) =>
                    form.setFieldValue('firstName', event.currentTarget.value)
                  }
                  radius="md"
                />
              )}
              {type === 'register' && (
                <TextInput
                  label="Last Name"
                  placeholder="Your name"
                  value={form.values.lastName}
                  onChange={(event) =>
                    form.setFieldValue('lastName', event.currentTarget.value)
                  }
                  radius="md"
                />
              )}

              <TextInput
                c="white"
                required
                label="Email"
                placeholder="hello@example.dev"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue('email', event.currentTarget.value)
                }
                error={form.errors.email && 'Invalid email'}
                radius="md"
              />

              <PasswordInput
                required
                label="Password"
                c="white"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue('password', event.currentTarget.value)
                }
                error={
                  form.errors.password &&
                  'Password should include at least 6 characters'
                }
                radius="md"
              />

              {type === 'register' && (
                <Checkbox
                  label="I accept terms and conditions"
                  checked={form.values.terms}
                  onChange={(event) =>
                    form.setFieldValue('terms', event.currentTarget.checked)
                  }
                />
              )}
            </Stack>

            <Group justify="space-between" mt="xl">
              <Anchor
                component="button"
                type="button"
                c="dimmed"
                onClick={() => toggle()}
                size="xs"
              >
                {type === 'register'
                  ? 'Already have an account? Login'
                  : "Don't have an account? Register"}
              </Anchor>
              <Button type="submit" radius="xl">
                {upperFirst(type)}
              </Button>
            </Group>
          </form>
        </Paper>
      </Flex>
    </Box>
  );
}
