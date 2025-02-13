import {
  Group,
  Avatar,
  Text,
  Card,
  Badge,
  Flex,
  rgba,
  Box
} from '@mantine/core';
import classes from './ConversationButton.module.css';
import {
  useContext} from 'react';
import { IconCheck, IconChecks } from '@tabler/icons-react';
import clsx from 'clsx';
import { ConversationProps, GlobalUser, Message } from '@/lib/@types/app';
import {
  useActiveConversation
} from '@/lib/context/activeConversation';
import { ScreenContext, screenContextType } from '@/lib/context/screenContext';
import { MessageState } from '@/lib/common/common';
import { useSocketContext } from '@/lib/hooks/useSocket';

interface Props {
  conversation: ConversationProps;
  open: () => void;
  index: number;
}
export function ConversationButton({
  conversation,
  open,
}: Props) {
  // const { user } = useContext(AppContext) as UserContextType;
  const { updateActiveScreen } = useContext(ScreenContext) as screenContextType;
  const { activeConversation, setActiveConversation } = useActiveConversation();
  
  const active: boolean = conversation.id === activeConversation?.id;
  conversation.messages.sort((a, b) => {
    const timeA = new Date(
      a.created_at
    ).getTime();
    const timeB = new Date(
      b.created_at
    ).getTime();
    return timeA - timeB;
  });
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  const user: GlobalUser = conversation.users[0];
  const count = conversation.messages.reduce(
    (total: number, message: Message) =>
      message.user.id === user?.id &&
        (message.state === MessageState.DELIVERED ||
          message.state === MessageState.SENT)
        ? (total += 1)
        : total,
    0
  );

  const date = lastMessage ? new Date(lastMessage?.updated_at) : null;
  const socket = useSocketContext()

  return (
    <Card
      className={clsx({ [classes.active]: active, [classes.normal]: !active })}
      onClick={() => {
        setActiveConversation(conversation);
        updateActiveScreen('chat');
        socket.emit('message-state', {
          state: MessageState.READ,
          conversationId: conversation.id
        });
      }}
      radius={0}
    >
      <Group onClick={open}>
        <Avatar src={user.photo} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" c={active ? 'white' : 'teal'} fw={500}>
            {`${user.firstName} ${user.lastName}`}
          </Text>

          <Text c={active ? '' : 'dimmed'} size="xs" lineClamp={1}>
            {lastMessage?.message}
          </Text>
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
            <Box pt={'4px'}>
              <LastMessage
                message={
                  conversation.messages[conversation.messages.length - 1]
                }
                user={user}
              />
            </Box>
          )}
        </Flex>
      </Group>
    </Card>
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
  return <Text style={{ color: rgba(`0 0 0`, 0) }}>--</Text>;
}
function formatDate(date: Date): string {
  const today = new Date();

  // Check if the date is the same as today's date
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isToday) {
    // Return time in hh:mm AM/PM format
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  } else {
    // Return date in dd/mm/yy format
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }
}
