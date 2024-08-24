import Miscelenious from '../../components/Miscelenious';
import { IconArrowLeftCircle } from '@tabler/icons-react';

import { Avatar, Button, Group, Paper, Text } from '@mantine/core';
import { CloseProps } from '../ChatArea/ChatArea';
import classes from './Bar.module.css';
import { useContext } from 'react';
import {
  activeConversatonType,
  ConversationContext,
} from '../../../../context/activeConversation';
import Dashboard from '../../../Dashboard/Dashboard';
import { useDisclosure } from '@mantine/hooks';

// Top Bar on the Chatbox Area
const Bar = ({ closes }: CloseProps) => {
  const { activeConversation, setActiveConversation } = useContext(
    ConversationContext,
  ) as activeConversatonType;
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Group
        p={'lg'}
        h={'80'}
        justify="space-between"
        align="center"
        className={classes.bar}
      >
        <Group bg={'none'}>
          <Button variant="outline" hiddenFrom="sm" bd={'none'}>
            <IconArrowLeftCircle
              size={20}
              onClick={() => {
                closes();
                setActiveConversation(null);
              }}
            />
          </Button>
          {activeConversation?.users ? (
            <Group onClick={open}>
              <Avatar src={activeConversation?.users[0].photo} />
              <div className="px-5">
                <Text>{activeConversation?.users[0].firstName}</Text>
                <p className="hidden lg:block md:text-sm">"Hello World"</p>
              </div>
            </Group>
          ) : (
            <Group>
              <Avatar src={activeConversation?.users[0].photo} />
              <div className="px-5">
                <Text>{activeConversation?.users[0].firstName}</Text>
                <p className="hidden lg:block md:text-sm">"Hello World"</p>
              </div>
            </Group>
          )}
        </Group>
        <Paper visibleFrom="sm" bg={'none'}>
          <Miscelenious />
        </Paper>
      </Group>
      {activeConversation ? (
        <Dashboard
          opened={opened}
          close={close}
          actUser={activeConversation?.users[0]}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default Bar;
