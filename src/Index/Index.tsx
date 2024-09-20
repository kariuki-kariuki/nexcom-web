import { Box, Button, Divider, Flex, Paper, rem, Text } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/appContext';
import { UserContextType } from '../@types/app';
import classes from './Index.module.css';
import { useFetch } from '../hooks/useFetchHooks';
import { GlobalUser } from '../@types/chat';
import HeroCarousel from './HeroCarousel';
import { IndexNav } from './IndexNav/IndexNav';
const links = [
  { link: '/chat', label: 'Chat' },
  { link: '/shop', label: 'Shop' },
  { link: '/cart', label: 'Cart' },
];

function Index() {
  const { user, updateUser } = useContext(AppContext) as UserContextType;
  const { result } = useFetch<GlobalUser>(`auth/me`);
  useEffect(() => {
    updateUser(result);
  }, [result]);

  return (
    <Paper h={'100vh'} px={{ base: 'sm', sm: 'lg' }} className={classes.main}>
      <IndexNav links={links} />
      <Flex
        justify={'space-between'}
        p={{ base: 'sm', sm: 'md' }}
        align={'center'}
        h={rem('70%')}
      >
        <Box w={{ base: '100%', sm: '50%' }}>
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
        </Box>
        <Box maw={'100%'} w={'50%'} visibleFrom="sm" p={'md'}>
          <HeroCarousel />
        </Box>
      </Flex>
    </Paper>
  );
}

export default Index;
