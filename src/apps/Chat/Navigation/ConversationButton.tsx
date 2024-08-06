import { Group, Avatar, Text, Card } from '@mantine/core';
import classes from './UserButton.module.css';
import { useContext, useEffect, useState } from 'react';
import { ConversationProps, GlobalUser } from '../../../@types/chat';
import {
  ConversationContext,
  activeConversatonType,
} from '../../../context/activeConversation';
import {
  ScreenContext,
  screenContextType,
} from '../../../context/screenContext';
import { io, Socket } from 'socket.io-client';

interface Props {
  conversation: ConversationProps;
  open: () => void;
}
export function ConversationButton({ conversation, open }: Props) {
  // const { user } = useContext(AppContext) as UserContextType;
  const { updateActiveScreen } = useContext(ScreenContext) as screenContextType;
  const { activeConversation, setActiveConversation } = useContext(
    ConversationContext,
  ) as activeConversatonType;
  const active: boolean = conversation.id == activeConversation?.id;
  const [messages, setMessages] = useState(conversation.messages);
  const lastMessage = messages ? messages[messages.length - 1] : null;
  const user: GlobalUser = conversation.users[0];
  const [socket, setSocket] = useState<Socket | null>(null);
  const url1 = 'ws://192.168.100.16:3002';
  useEffect(() => {
    // const url2 = 'ws://localhost:3002';
    // const socket = io(url1);
    const token = localStorage.getItem('token');
    console.log(token);
    setSocket(
      io(url1, {
        extraHeaders: {
          authorization: `Bearer ${token}`,
        },
      }),
    );

    socket?.on('join', () => {
      console.log('Connected to socket server');
      console.log('joining room', conversation.id);
      socket.emit('join', conversation.id);
    });

    socket?.on('message', (msg) => {
      console.log('Message received', msg);
      msg.date = new Date(msg.date);
      setMessages((messages): any => [...messages, msg]);
    });
  }, []);
  return (
    <Card
      className={classes.user}
      bg={active ? 'black' : ''}
      onClick={() => {
        setActiveConversation(conversation);
        updateActiveScreen('chat');
      }}
      radius={active ? 'md' : '0'}
    >
      <Group onClick={open}>
        <Avatar src={user.photo} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" c="teal.4" fw={500}>
            {`${user.firstName} ${user.lastName}`}
          </Text>

          <Text c="dimmed" size="xs" lineClamp={1}>
            {lastMessage?.message}
          </Text>
          <Group justify="flex-end">
            <Text c="teal" size="xs">
              {lastMessage?.time}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
}
