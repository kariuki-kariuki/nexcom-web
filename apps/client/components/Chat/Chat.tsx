'use client';

import { Box, Flex, Modal } from '@mantine/core';
import classes from './Chat.module.css';
import { useDisclosure } from '@mantine/hooks';
import ChatArea from '../ChatArea/ChatArea';
import { Socket } from 'socket.io-client';
import ConversationButtonList from '../ConversationButtonList/ConversationButtonList';
import { useGlobalStore } from '@/lib/context/global-store.provider';
export type SocketType = Socket | null;
export type activeType = (active: any) => void;

function Chat() {
   const activeConversation = useGlobalStore(state => state.activeConversation);
  const [opened, { open, close }] = useDisclosure(false);
  const conversations = useGlobalStore((state) => state.conversations);
  const activeCNV = conversations.find((conv) => conv.id === activeConversation?.id)
  return (
    <Flex
      wrap="nowrap"
      h="100vh"
      className={classes.main}
    >
      <Box
        className={classes.overflow}
        h="100%"
        w={{ base: '100%', sm: '50%', md: '30%', lg: '25*' }}
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
        style={{ flex: 1}}
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
