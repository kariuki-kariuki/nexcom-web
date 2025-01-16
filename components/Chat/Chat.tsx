'use client';

import { Card, Flex, Modal } from '@mantine/core';
import classes from './Chat.module.css';
import { useDisclosure } from '@mantine/hooks';
import ChatArea from '../ChatArea/ChatArea';
import { useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { AppContext } from '../../lib/context/appContext';
import { MessageState } from '../../lib/common/common';
import {
  activeConversatonType,
  ConversationContext
} from '@/lib/context/activeConversation';
import ConversationButtonList from '../ConversationButtonList/ConversationButtonList';
import { ConversationProps, UserContextType } from '@/lib/@types/app';
import getToken from '@/lib/cookies';
import { API_URL, WS_URL } from '@/lib/common/constans';
export type SocketType = Socket | null;
export type activeType = (active: any) => void;

function Chat() {
  const [conversations, setConversations] = useState<ConversationProps[]>([]);
  const { user } = useContext(AppContext) as UserContextType;
  // user;
  const { activeConversation, setActiveConversation } = useContext(
    ConversationContext
  ) as activeConversatonType;
  const [socket, setSocket] = useState<SocketType>(null);
  useEffect(() => {
    const fetchItems = async () => {
      const token = await getToken();

      setSocket(
        io(WS_URL, {
          extraHeaders: {
            authorization: `Bearer ${token}`
          }
        })
      );
      console.log(API_URL);
      try {
        fetch(`${API_URL}/conversations`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((res: any) => {
          if (res.ok) {
            res.json().then((res: any) => {
              setConversations(res);
            });
          }
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    try {
      socket?.emit('message-state', { state: 'delivered' });
    } catch (e) {
      console.log('Server failed', e);
    }
  }, [socket]);

  const [activeConvo, setActiveConvo] = useState<ConversationProps | null>(
    null
  );
  const [opened, { open, close }] = useDisclosure(false);
  useEffect(() => {
    const handleState = (res: any) => {
      if (res.state === MessageState.DELIVERED) {
        setConversations((prevConversations) =>
          prevConversations.map((conversation) => {
            // If My messages have been delivered to user B
            if (conversation.users[0].email === res.email) {
              const updatedConvo = {
                ...conversation,
                messages: conversation.messages.map((message) =>
                  message.user.email !== res.email &&
                  message.state === MessageState.SENT
                    ? { ...message, state: MessageState.DELIVERED }
                    : message
                )
              };
              if (updatedConvo.id === activeConversation?.id) {
                setActiveConversation(updatedConvo);
                setActiveConvo(updatedConvo);
              }
              return updatedConvo;
            }
            return conversation;
          })
        );
      } else {
        // Handle message read for the current user
        // Read By User B
        setConversations((prevConversation) =>
          prevConversation.map((conversation) => {
            if (
              conversation.id === res.conversationId &&
              res.email != user?.email
            ) {
              conversation = {
                ...conversation,
                messages: conversation.messages.map((message) =>
                  message.user.email === user?.email &&
                  message.state !== MessageState.READ
                    ? { ...message, state: MessageState.READ }
                    : message
                )
              };
              if (conversation.id === activeConversation?.id) {
                setActiveConvo(conversation);
                setActiveConversation(conversation);
              }
              return conversation;
            }
            return conversation;
          })
        );
      }
    };
    socket?.on('message-state', handleState);

    return () => {
      socket?.off('message-state', handleState);
    };
  });

  return (
    <Flex
      wrap="nowrap"
      gap={'md'}
      p={{ base: '0px', sm: 'sm', md: 'sm' }}
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
        p={0}
        w={{ sm: '60%', md: '70%' }}
        h="100%"
        radius={'lg'}
        bd={'none'}
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
          <ChatArea closes={close} activeConvo={activeConvo} socket={socket} />
        </Card>
      </Modal>
    </Flex>
  );
}

export default Chat;
