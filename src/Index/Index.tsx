import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Paper,
  rem,
  Text,
} from '@mantine/core';
import logo from '../assets/mklogo.png';
import { IconArrowRight } from '@tabler/icons-react';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/appContext';
import { UserContextType } from '../@types/app';
import MenuDrop from './MenuDrop';
import { useNavigate } from 'react-router-dom';
import classes from './Index.module.css';
import { useFetch } from '../hooks/useFetchHooks';
import { GlobalUser } from '../@types/chat';
const links = [
  { link: '/chat', label: 'Chat' },
  { link: '/shop', label: 'Shop' },
  { link: '/admin', label: 'Admin' },
];

function Index() {
  const { user, updateUser } = useContext(AppContext) as UserContextType;
  const { result } = useFetch<GlobalUser>(`auth/me`);
  const navigate = useNavigate();
  useEffect(() => {
    updateUser(result);
  }, [result]);
  const items = links.map((link) => (
    <div className={classes.link} onClick={() => navigate(link.link)}>
      {link.label}
    </div>
  ));
  return (
    <Paper h={'100vh'} p={{ base: 'sm', sm: 'lg' }} className={classes.main}>
      <div className="flex justify-between p-5 md:p-5  sticky top-0 left-0 right-0">
        <Group align="center">
          <Avatar src={logo} />
          <Text className={classes.text}>COCO</Text>
        </Group>
        <Group>{items}</Group>
        <Group visibleFrom="sm">
          {/* <TextInput
              placeholder="search"
              pr={10}
              visibleFrom="sm"
              leftSection={<IconSearch size={18} />}
              rightSection={
                <Text size="xs" c="dimmed">
                  ⌘K
                </Text>
              }
            /> */}
          {user?.firstName ? (
            <MenuDrop />
          ) : (
            <Button onClick={() => navigate('/login')}>Login</Button>
          )}
        </Group>
      </div>
      <Flex
        justify={'space-between'}
        p={{ base: 'sm', sm: 'md' }}
        align={'center'}
        h={rem('70%')}
      >
        <div>
          <Text
            ff={'serif'}
            fw={{ base: 'bold' }}
            fz={{ base: 'md', sm: 'h1' }}
          >
            Bringing You a <br />
            New Experience In <br />
            <Text
              component="span"
              ff={'serif'}
              c={'teal'}
              fw={{ base: 'bold' }}
              fz={{ base: 'md', sm: 'h1' }}
            >
              Communication
            </Text>{' '}
            <Text component="span" ff={'serif'} fz={{ base: 'md', sm: 'h1' }}>
              And
            </Text>{' '}
            <Text
              c="teal"
              ff={'serif'}
              component="span"
              fw={{ base: 'bold' }}
              fz={{ base: 'md', sm: 'h1' }}
            >
              Commerce
            </Text>
          </Text>

          <Divider color={'teal'} className="w-3/5 mb-3" />
          <Divider color={'teal'} className="w-2/5 mb-3" />
          <Divider color={'teal'} className="w-1/5 mb-3" />
          <Button
            variant="outline"
            component="a"
            href={user?.firstName ? '/shop' : '/login'}
            rightSection={<IconArrowRight size={20} />}
            color="teal"
          >
            Get Started
          </Button>
        </div>
        <Box>
          <Text fz={{ base: '50px' }} lh={1} fw={900}>
            CO
          </Text>
          <Text fz={{ base: '50px' }} fw={900}>
            CO
          </Text>
        </Box>
      </Flex>
    </Paper>
  );
}

export default Index;
