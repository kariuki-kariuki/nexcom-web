'use client';

import { Card, Flex, Modal } from '@mantine/core';
import classes from './Chat.module.css';
import { useDisclosure } from '@mantine/hooks';
import ChatArea from '../ChatArea/ChatArea';
import { useContext } from 'react';
import { Socket } from 'socket.io-client';
import { AppContext, useGlobalContext } from '../../lib/context/appContext';
import {
  activeConversatonType,
  ConversationContext
} from '@/lib/context/activeConversation';
import ConversationButtonList from '../ConversationButtonList/ConversationButtonList';
import { UserContextType } from '@/lib/@types/app';
import { useChat } from '@/lib/context/ConversationContext';
export type SocketType = Socket | null;
export type activeType = (active: any) => void;

function Chat() {
  const { activeConversation, setActiveConversation } = useContext(
    ConversationContext
  ) as activeConversatonType;

  const [opened, { open, close }] = useDisclosure(false);
  const { state } = useChat();
  const activeCNV = state.conversations.find((conv) => conv.id === activeConversation?.id)
  return (
    <Flex
      wrap="nowrap"
      h="100vh"
      className={classes.main}
    >
      <Card
        className={classes.overflow}
        h="100%"
        w={{ sm: '40%', md: '30%' }}
        padding={2}
        bd={'none'}
      >
        <ConversationButtonList
          open={open}
        />
      </Card>
      <Card
        visibleFrom="sm"
        className={`${classes.overflow}`}
        p={0}
        w={{ sm: '60%', md: '70%' }}
        h="100%"
        bd={'none'}
      >
        <ChatArea closes={close} activeConvo={activeCNV} />
      </Card>
      <Modal
        radius="md"
        opened={opened}
        onClose={close}
        hiddenFrom="sm"
        withCloseButton={false}
        p={'0px'}
        m={0}
        // size={'100vh'}
        fullScreen
        classNames={{ root: classes.root, body: classes.body }}
        padding={'0px'}
      >
        <Card
          className={`${classes.overflow}`}
          padding={'0px'}
          m={'0px'}
          h={'100%'}
          bd={'none'}
        >
          <ChatArea closes={close} activeConvo={activeCNV} />
        </Card>
      </Modal>
    </Flex>
  );
}

export default Chat;
