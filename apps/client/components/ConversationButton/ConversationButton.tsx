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
  Paper,
  Indicator
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconCheck, IconChecks, IconImageInPicture, IconPhoto, IconShoppingBag } from '@tabler/icons-react';
import { ConversationProps, GlobalUser, Message, PayloadMessage } from '@/lib/@types/app';
import { MessageState } from '@/lib/common/common';
import { useSocketContext } from '@/lib/hooks/useSocket';
import { formatDate } from '@/utils/helpers';
import { useMediaQuery } from '@mantine/hooks';
import classes from './ConversationButton.module.css'
import { useGlobalStore } from '@/lib/context/global-store.provider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  conversation: ConversationProps;
  index: number;
}

export function ConversationButton({ conversation }: Props) {
  const guser = useGlobalStore(state => state.user)
  const updateMessage = useGlobalStore((state) => state.updateMessage)
  const [count, setCount] = useState(0);
  const theme = useMantineTheme();
  const tablet = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const path = usePathname()
  const active = path.endsWith(conversation.id);
  const [onlineStatus, setOnlineStatus] = useState('offline')
  const user: GlobalUser = conversation.users[0];

  const socket = useSocketContext();

  useEffect(() => {
    socket.emit("online-status", { userId: user.id }, (res: { userId: string, status: string }) => {
      setOnlineStatus(res.status);
    })

    socket.on("online-status", (res: { userId: string, status: string }) => {
      if (res.userId === user?.id) {
        setOnlineStatus(res.status);
      }
    })

    return () => {
      socket.off('online-status')
    }
  }, [socket, user, onlineStatus])
  // Sort messages outside of render
  const sortedMessages = conversation.messages?.sort((a, b) => {
    const timeA = new Date(a.created_at).getTime();
    const timeB = new Date(b.created_at).getTime();
    return timeA - timeB;
  });

  const lastMessage = sortedMessages ? sortedMessages[sortedMessages.length - 1] : null;

  // Calculate unread messages count inside useEffect
  useEffect(() => {
    const unreadMessages = conversation.messages?.reduce(
      (total: number, message: Message) =>
        message.user.id === user?.id &&
          (message.state === MessageState.DELIVERED || message.state === MessageState.SENT)
          ? total + 1
          : total,
      0
    );
    setCount(unreadMessages || 0);
  }, [conversation]);

  const date = lastMessage ? new Date(lastMessage?.updated_at) : null;

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
    <Link href={`/chat/${conversation.id}`}>
      <Card
        className={classes.convoButton}
        data-active={active || undefined}
        p={10}
        radius={0}
      >
        <Group>
          <Indicator inline size={10} offset={7} position="bottom-end" color={onlineStatus === 'online' ? 'green': 'red'} withBorder>
            <Avatar src={user?.avatar?.signedUrl} size='lg' radius="xl" name={user?.fullName} />
          </Indicator>
          <div style={{ flex: 1 }}>
            <Text size="sm" c={active ? 'white' : 'teal'} fw={500}>
              {user?.fullName}
            </Text>
            <Group py="3px" wrap="nowrap">
              {lastMessage?.productId && guser?.id !== user.id ? (
                <IconShoppingBag size={14} />
              ) : (
                ''
              )}
              <Group>
                {lastMessage?.files && lastMessage.files.length > 0 && <IconPhoto stroke={1.5} size={18} />}
                <Text c={active ? '' : 'dimmed'} size="xs" lineClamp={1}>
                  {lastMessage?.message}
                </Text>
              </Group>
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
                {lastMessage && <LastMessage
                  message={lastMessage}
                  user={user}
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
