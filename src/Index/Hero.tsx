'use client';

import { Box, Button, Divider, Flex, Paper, rem, Text } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useContext, useEffect } from 'react';
import classes from './Index.module.css';
import { useFetch } from '../../lib/bhooks/useFetchHooks';
import { IndexNav } from './IndexNav/IndexNav';
import Link from 'next/link';
import { AppContext } from '@/lib/context/appContext';
import { GlobalUser, UserContextType } from '@/lib/@types/app';
const links = [
  { link: '/chat', label: 'Chat' },
  { link: '/shop', label: 'Shop' },
  { link: '/cart', label: 'Cart' }
];

function Hero() {
  const { setUser } = useContext(AppContext) as UserContextType;
  const { response } = useFetch<GlobalUser>(`auth/me`);
  useEffect(() => {
    setUser(response);
  }, [response]);
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
            <Link href="/chat">
              <Button
                rightSection={<IconArrowRight size={20} />}
                color="teal.5"
                px={{ base: 'lg', sm: 'xl' }}
              >
                Get Started
              </Button>
            </Link>
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

export default Hero;
