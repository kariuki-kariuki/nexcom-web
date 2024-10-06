import { Box, Button, Divider, Flex, Paper, rem, Text } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/appContext';
import { UserContextType } from '../@types/app';
import classes from './Index.module.css';
import { useFetch } from '../hooks/useFetchHooks';
import { GlobalUser } from '../@types/chat';
import { IndexNav } from './IndexNav/IndexNav';
import { useNavigate } from 'react-router-dom';
const links = [
  { link: '/chat', label: 'Chat' },
  { link: '/shop', label: 'Shop' },
  { link: '/cart', label: 'Cart' },
];

function Index() {
  const { user, updateUser } = useContext(AppContext) as UserContextType;
  const { response } = useFetch<GlobalUser>(`auth/me`);
  useEffect(() => {
    updateUser(response);
  }, [response]);
  const navigate = useNavigate();
  return (
    <Paper h={'100vh'} px={{ base: 'sm', sm: 'lg' }} className={classes.main}>
      <Flex direction={'column'} h={'100%'}>
        <IndexNav links={links} />
        <Flex
          justify={{ base: 'center', sm: 'space-between' }}
          p={{ base: 'sm', sm: 'md' }}
          align={'center'}
          h={rem('100%')}
          direction={{ base: 'column', sm: 'row' }}
        >
          <Box w={{ base: '100%', sm: '60%' }}>
            <Text
              ff={'poppins'}
              fw={{ base: 'bold' }}
              lh={'1'}
              fz={{ base: '40px', sm: '60px' }}
            >
              Bringing You a New Experience In{'  '}
              <Text component="span" inherit c={'orange.7'}>
                Communication
              </Text>{' '}
              <Text component="span" inherit>
                And
              </Text>{' '}
              <Text c="teal" inherit component="span">
                Commerce
              </Text>
            </Text>

            <Divider color={'teal'} className="w-3/5 mb-3" />
            <Divider color={'teal'} className="w-2/5 mb-3" />
            <Divider color={'teal'} className="w-1/5 mb-3" />
            <Button
              component="a"
              rightSection={<IconArrowRight size={20} />}
              color="teal.5"
              px={{ base: 'lg', sm: 'xl' }}
              onClick={() => navigate(user ? '/shop' : '/login')}
            >
              Get Started
            </Button>
          </Box>
          <Box
            maw={'100%'}
            w={{ sm: '40%' }}
            visibleFrom="sm"
            p={'md'}
            h={'90%'}
            className={classes.carousel}
          >
            {/* <HeroCarousel /> */}
          </Box>
        </Flex>
      </Flex>
    </Paper>
  );
}

export default Index;
