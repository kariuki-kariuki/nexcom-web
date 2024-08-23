import { Group, Avatar, Text, Card, Badge, Flex } from '@mantine/core';
import classes from './UserButton.module.css';
import { useContext, useEffect, useState } from 'react';
import { ConversationProps, GlobalUser, Message } from '../../../@types/chat';
import {
  ConversationContext,
  activeConversatonType,
} from '../../../context/activeConversation';
import {
  ScreenContext,
  screenContextType,
} from '../../../context/screenContext';
import { activeType, SocketType } from '../Chat';

interface Props {
  conversation: ConversationProps;
  open: () => void;
  socket: SocketType;
  setActiveConvo: activeType;
}
export function ConversationButton({
  conversation,
  open,
  socket,
  setActiveConvo,
}: Props) {
  // const { user } = useContext(AppContext) as UserContextType;
  const { updateActiveScreen } = useContext(ScreenContext) as screenContextType;
  const { activeConversation, setActiveConversation } = useContext(
    ConversationContext,
  ) as activeConversatonType;
  const active: boolean = conversation.id === activeConversation?.id;
  const [messages, setMessages] = useState(conversation.messages);
  const lastMessage = messages ? messages[messages.length - 1] : null;
  const user: GlobalUser = conversation.users[0];
  const [count, setCount] = useState(0);
  const date = lastMessage ? new Date(lastMessage?.updated_at) : null;
  useEffect(() => {
    const handleMessage = (msg: any) => {
      if (msg.conversation.id === conversation.id) {
        const message: Message = {
          message: msg.message,
          user: msg.user,
          files: msg.files,
          updated_at: msg.updated_at,
        };
        setMessages((messages): any => [...messages, message]);
        if (msg.conversation.id === activeConversation?.id) {
          conversation.messages.push(message);
          setActiveConversation(conversation);
          setActiveConvo((conversation: any) => ({
            ...conversation,
            conversation,
          }));
        } else {
          setCount((prev) => prev + 1);
        }
      }
    };

    socket?.on('message', handleMessage);

    return () => {
      socket?.off('message', handleMessage);
    };
  }, [socket, conversation, activeConversation, messages]);
  return (
    <Card
      className={classes.user}
      bg={active ? 'purple' : 'coco'}
      onClick={() => {
        setActiveConversation(conversation);
        setActiveConvo(conversation);
        updateActiveScreen('chat');
        setCount(0);
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
        </div>
        <Flex direction={'column'} justify={'center'} align={'center'}>
          <Text c="lime" size="xs">
            {`${date?.toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}`}
          </Text>
          {count > 0 ? (
            <Badge size="md" circle color="teal">
              {count}
            </Badge>
          ) : (
            <Text c={active ? 'purple' : 'coco.0'}>--</Text>
          )}
        </Flex>
      </Group>
    </Card>
  );
}
