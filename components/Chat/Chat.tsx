'use client';

import { Box, Card, Flex, Modal } from '@mantine/core';
import classes from './Chat.module.css';
import { useDisclosure } from '@mantine/hooks';
import ChatArea from '../ChatArea/ChatArea';
import { useContext } from 'react';
import { Socket } from 'socket.io-client';
import {
  activeConversatonType,
  ConversationContext
} from '@/lib/context/activeConversation';
import ConversationButtonList from '../ConversationButtonList/ConversationButtonList';
import useWebSocket from '@/lib/hooks/useWebsockets';
export type SocketType = Socket | null;
export type activeType = (active: any) => void;

function Chat() {
  const { activeConversation, setActiveConversation } = useContext(
    ConversationContext
  ) as activeConversatonType;

  const [opened, { open, close }] = useDisclosure(false);
  const { state } = useWebSocket();
  const activeCNV = state.conversations.find((conv) => conv.id === activeConversation?.id)
  return (
    <Flex
      wrap="nowrap"
      h="100vh"
      className={classes.main}
    >
      <Box
        className={classes.overflow}
        h="100%"
        w={{ sm: '30%', md: '25%' }}
        bd={'none'}
      >
        <ConversationButtonList
          open={open}
        />
      </Box>
      <Box
        visibleFrom="sm"
        className={`${classes.overflow}`}
        p={0}
        w={{ sm: '70%', md: '75%' }}
        h="100%"
        bd={'none'}
      >
        <ChatArea closes={close} activeConvo={activeCNV} />
      </Box>
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
        <Box
          className={`${classes.overflow}`}
          m={'0px'}
          h={'100%'}
          bd={'none'}
        >
          <ChatArea closes={close} activeConvo={activeCNV} />
        </Box>
      </Modal>
    </Flex>
  );
}

export default Chat;
