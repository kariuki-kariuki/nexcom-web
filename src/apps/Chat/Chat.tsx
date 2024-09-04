import Navigation from './Navigation/Navigation';
import { Card, Flex, Modal, useMantineColorScheme } from '@mantine/core';
import classes from './Chat.module.css';
import { useDisclosure } from '@mantine/hooks';
import ChatArea from './ChatBox/ChatArea/ChatArea';
import { useContext, useEffect, useState } from 'react';
import { url, url1 } from '../../data/url';
import { io, Socket } from 'socket.io-client';
import { AppContext } from '../../context/appContext';
import { UserContextType } from '../../@types/app';
import { ConversationProps } from '../../@types/chat';
import { MessageState } from '../../common/common';
export type SocketType = Socket | null;
export type activeType = (active: any) => void;

function Chat() {
  const [conversations, setConversations] = useState<ConversationProps[]>([]);
  const { user } = useContext(AppContext) as UserContextType;
  const [socket, setSocket] = useState<SocketType>(null);
  useEffect(() => {
    const token = localStorage.getItem('token');

    setSocket(
      io(url1, {
        extraHeaders: {
          authorization: `Bearer ${token}`,
        },
      }),
    );

    fetch(`${url}/conversations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res: any) => {
      if (res.ok) {
        res.json().then((res: any) => {
          setConversations(res);
        });
      }
    });
  }, []);

  useEffect(() => {
    try {
      socket?.emit('message-state', { state: 'delivered' });
    } catch (e) {
      console.log('Server failed', e);
    }
  }, [socket]);

  const [activeConvo, setActiveConvo] = useState<ConversationProps | null>(
    null,
  );
  const [opened, { open, close }] = useDisclosure(false);
  const { colorScheme } = useMantineColorScheme();
  const bgColor = colorScheme === 'dark' ? 'gray.8' : 'gray.8';
  useEffect(() => {
    const handleState = (res: any) => {
      console.log('State Change', res);
      if (res.email != user?.email) {
        if (res.state === MessageState.DELIVERED) {
          setConversations((prevConversations) =>
            prevConversations.map((conversation) => ({
              ...conversation,
              messages: conversation.messages.map((message) =>
                message.user.email === res.email
                  ? { ...message, state: MessageState.DELIVERED }
                  : message,
              ),
            })),
          );
          console.log('gibberish');
          console.log(conversations);
        } else {
          setConversations((prevConversations) =>
            prevConversations.map((conversation) => ({
              ...conversation,
              messages: conversation.messages.map((message) =>
                conversation.id === res.conversation_id &&
                message.state !== MessageState.READ
                  ? { ...message, state: MessageState.READ }
                  : message,
              ),
            })),
          );
          console.log(conversations);
        }
      }
    };
    socket?.on('message-state', handleState);

    return () => {
      socket?.off('message-state', handleState);
    };
  }, []);

  return (
    <Flex
      wrap="nowrap"
      gap={5}
      p={{ base: '0px', sm: 'sm', md: 'sm' }}
      h="100vh"
      bg={bgColor}
    >
      <Card
        className={classes.overflow}
        h="100%"
        w={{ sm: '40%', md: '30%' }}
        padding={2}
      >
        <Navigation
          conversations={conversations}
          setActiveConvo={setActiveConvo}
          open={open}
          socket={socket}
          setConverSations={setConversations}
        />
      </Card>
      <Card
        visibleFrom="sm"
        className={`${classes.overflow}`}
        p={2}
        w={{ sm: '60%', md: '70%' }}
        h="100%"
        radius={'lg'}
      >
        <ChatArea closes={close} activeConvo={activeConvo} socket={socket} />
      </Card>
      <Modal
        radius="md"
        opened={opened}
        onClose={close}
        hiddenFrom="sm"
        withCloseButton={false}
        p={'0px'}
        m={0}
        size={'100vh'}
        fullScreen
        classNames={{ root: classes.root }}
        padding={'0px'}
      >
        <Card
          className={`${classes.overflow}`}
          padding={'0px'}
          m={'0px'}
          h={'97vh'}
          bg={colorScheme == 'dark' ? 'dark' : 'teal'}
        >
          <ChatArea closes={close} activeConvo={activeConvo} socket={socket} />
        </Card>
      </Modal>
    </Flex>
  );
}

export default Chat;
