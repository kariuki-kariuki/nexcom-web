import { Avatar, Button, Flex, Group, Paper, rem, Text } from '@mantine/core';
import logo from '../assets/mklogo.png';
import { IconArrowRight } from '@tabler/icons-react';
import { useContext } from 'react';
import { AppContext } from '../context/appContext';
import { UserContextType } from '../@types/app';
import MenuDrop from './MenuDrop';
import { useNavigate } from 'react-router-dom';
import classes from './Index.module.css';

function Index() {
  const { user } = useContext(AppContext) as UserContextType;
  const navigate = useNavigate();
  return (
    <Paper h={'100vh'} p={{ base: 'sm', sm: 'lg' }} className={classes.main}>
      <div className="flex justify-between p-5 md:p-5  sticky top-0 left-0 right-0">
        <Group align="center">
          <Avatar src={logo} />
          <Text className={classes.text}>COCO</Text>
        </Group>
        <Group>
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
          {user.firstName ? (
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
            <span className="text-orange-500">Communication</span> and{' '}
            <span className="text-orange-500">Commerce</span>
          </Text>

          <hr className="w-3/5 mb-3 border-purple-900" />
          <hr className="w-2/5 mb-3 border-purple-900" />
          <hr className="w-1/5 mb-3 border-purple-900" />
          <Button
            variant="outline"
            component="a"
            href={user.firstName ? '/shop' : '/login'}
            rightSection={<IconArrowRight size={20} />}
            color="purple"
          >
            Get Started
          </Button>
        </div>
        <div className="">
          <p className="text-8xl">CO</p>
          <p className="text-8xl">CO</p>
        </div>
      </Flex>
    </Paper>
  );
}

export default Index;
