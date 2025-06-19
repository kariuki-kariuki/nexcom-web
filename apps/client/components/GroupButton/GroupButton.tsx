'use client';
import {
  Group,
  Avatar,
  Text,
  Card,
  Badge,
  Flex,
  Box,
  useMantineTheme,
  Paper
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconCheck, IconChecks, IconShoppingBag, IconUsersGroup } from '@tabler/icons-react';
import { ConversationProps, GlobalUser, Message, PayloadMessage } from '@/lib/@types/app';
import { MessageState } from '@/lib/common/common';
import { useSocketContext } from '@/lib/hooks/useSocket';
import { formatDate } from '@/utils/helpers';
import { useMediaQuery } from '@mantine/hooks';
import classes from './GroupButton.module.css'
import { useGlobalStore } from '@/lib/context/global-store.provider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  conversation: ConversationProps;
  index: number;
}

export function GroupButton({ conversation }: Props) {
  const guser = useGlobalStore(state => state.user)
  const updateMessage = useGlobalStore((state) => state.updateMessage)
  const [count, setCount] = useState(0);
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const path = usePathname()
  const active = path.endsWith(conversation.id);

  // Sort messages outside of render
  const sortedMessages = [...conversation.messages].sort((a, b) => {
    const timeA = new Date(a.created_at).getTime();
    const timeB = new Date(b.created_at).getTime();
    return timeA - timeB;
  });

  const lastMessage = sortedMessages[sortedMessages.length - 1];

  // Calculate unread messages count inside useEffect
  useEffect(() => {
    const unreadMessages = conversation.messages.reduce(
      (total: number, message: Message) =>
        message.user.id !== guser?.id &&
          (message.state === MessageState.DELIVERED || message.state === MessageState.SENT)
          ? total + 1
          : total,
      0
    );
    setCount(unreadMessages);
  }, [conversation]);

  const date = lastMessage ? new Date(lastMessage?.updated_at) : null;
  const socket = useSocketContext();

  useEffect(() => {
    if (count > 0) {

      if (active) {

        socket.emit(
          'message-state',
          {
            state: MessageState.READ,
            conversationId: conversation.id,
            receiverId: conversation.users[0].id
          },
          (res: PayloadMessage) => {
            updateMessage(res);
          }
        );

      } else {
        socket.emit(
          'message-state',
          {
            state: MessageState.DELIVERED,
            conversationId: conversation.id,
            receiverId: conversation.users[0].id
          },
          (res: PayloadMessage) => {
            updateMessage(res);
          }
        );
      }

    }
  }, [count, socket, active, updateMessage]);

  return (
    <Link href={`/chat/group/${conversation.id}`}>
      <Card
        className={classes.convoButton}
        data-active={active || undefined}
        p="10"
        onClick={() => {
          if (count > 0) {
            socket.emit(
              'message-state',
              {
                state: MessageState.READ,
                conversationId: conversation.id,
                receiverId: conversation.users[0].id
              },
              (res: PayloadMessage) => {
                updateMessage(res);
              }
            );
          }
        }}
        radius={0}
      >
        <Group>
          <Avatar src={conversation.profile?.signedUrl} size={mobile ? 'md' : 'lg'} radius="xl" name={conversation.name} />
          <div style={{ flex: 1 }}>
            <Group c="orange.6" justify='space-between'>
              <Text size="sm" fw={500}>
                {conversation.name?.toUpperCase() || 'Unknown Group'}
              </Text>
              <IconUsersGroup size={20}/>
            </Group>
            <Group py="3px" wrap="nowrap">
              {lastMessage && lastMessage.productId && guser?.id !== lastMessage.user.id ? (
                <IconShoppingBag size={14} />
              ) : (
                ""
              )}
              <Text c={active ? '' : 'dimmed'} size="xs" lineClamp={1}>
                {lastMessage?.message ? lastMessage.message : conversation.creator?.id === guser?.id ? 'You created a new group' : 'You have been added to a new Group'}
              </Text>
            </Group>
          </div>
          <Flex direction={'column'} justify={'center'} align={'center'}>
            <Text c={active ? 'white' : 'lime'} size="xs">
              {date ? formatDate(date) : ''}
            </Text>
            {count > 0 ? (
              <Badge size="md" circle color="teal">
                {count}
              </Badge>
            ) : (
              <Paper bg="none" pt={'4px'}>
                {lastMessage && guser && <LastMessage
                  message={lastMessage}
                  user={lastMessage.user}
                />}
              </Paper>
            )}
          </Flex>
        </Group>
      </Card>
    </Link>
  );
}

interface ILastMessage {
  message: Message;
  user: GlobalUser;
}

function LastMessage({ message, user }: ILastMessage) {
  if (message.user.id !== user.id) {
    if (message.state === MessageState.SENT) {
      return <IconCheck size={14} />;
    } else if (message.state === MessageState.DELIVERED) {
      return <IconChecks color="gray" size={14} />;
    } else {
      return <IconChecks color="lime" size={16} />;
    }
  }
  return <Text style={{ color: "rgba(`0 0 0`, 0)" }}>--</Text>;
}
