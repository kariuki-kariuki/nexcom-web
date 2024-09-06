import {
  Group,
  Avatar,
  Text,
  Card,
  Badge,
  Flex,
  rgba,
  Box,
} from '@mantine/core';
import classes from './ConversationButton.module.css';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  ConversationProps,
  GlobalUser,
  Message,
} from '../../../../@types/chat';
import {
  ConversationContext,
  activeConversatonType,
} from '../../../../context/activeConversation';
import {
  ScreenContext,
  screenContextType,
} from '../../../../context/screenContext';
import { activeType, SocketType } from '../../Chat';
import {
  NewConversationContext,
  NewConversationType,
} from '../../../../context/newConversation';
import { MessageState } from '../../../../common/common';
import { IconCheck, IconChecks } from '@tabler/icons-react';

interface Props {
  conversation: ConversationProps;
  open: () => void;
  socket: SocketType;
  setActiveConvo: activeType;
  setConverSations: Dispatch<SetStateAction<ConversationProps[]>>;
  index: number;
}
export function ConversationButton({
  conversation,
  open,
  socket,
  setActiveConvo,
  setConverSations,
}: Props) {
  // const { user } = useContext(AppContext) as UserContextType;
  const { updateActiveScreen } = useContext(ScreenContext) as screenContextType;
  const { activeConversation, setActiveConversation } = useContext(
    ConversationContext,
  ) as activeConversatonType;
  const { newConversation, setNewConversation } = useContext(
    NewConversationContext,
  ) as NewConversationType;
  const active: boolean = conversation.id === activeConversation?.id;
  const [messages, setMessages] = useState(conversation.messages);
  const lastMessage = messages ? messages[messages.length - 1] : null;
  const user: GlobalUser = conversation.users[0];
  const count = conversation.messages.reduce(
    (total, message) =>
      message.user.email === user.email &&
      (message.state === MessageState.DELIVERED ||
        message.state === MessageState.SENT)
        ? (total += 1)
        : total,
    0,
  );
  const handleRead = () => {
    socket?.emit('message-state', {
      state: MessageState.READ,
      conversation_id: conversation.id,
    });
    // make sure all the messages from the other user is marked as read
    conversation.messages = conversation.messages.map((message) =>
      message.user.email === user.email
        ? {
            ...message,
            state: MessageState.READ,
          }
        : message,
    );
    setActiveConversation(conversation);
    setActiveConvo(conversation);
  };
  const date = lastMessage ? new Date(lastMessage?.updated_at) : null;
  useEffect(() => {
    if (newConversation?.id === user.id) {
      setActiveConversation(conversation);
      setNewConversation(null);
    }
    const handleMessage = (msg: any) => {
      if (msg.conversation.id === conversation.id) {
        const message: Message = {
          message: msg.message,
          user: msg.user,
          files: msg.files,
          updated_at: msg.updated_at,
          state: MessageState.SENT,
        };
        if (message.user.email === user.email) {
          socket?.emit('message-state', { state: MessageState.DELIVERED });
        }
        setMessages((messages): any => [...messages, message]);
        setConverSations((prevConversations) =>
          prevConversations.map((convo) =>
            convo.id === conversation.id
              ? { ...convo, messages: [...convo.messages, message] }
              : convo,
          ),
        );
        if (msg.conversation.id === activeConversation?.id) {
          // If it is the current active conversation
          if (message.user.email === user.email) {
            socket?.emit('message-state', {
              state: MessageState.READ,
              conversation_id: conversation.id,
            });
            message.state = MessageState.READ;
            conversation.messages.push(message);
            setActiveConversation(conversation);
            setActiveConvo(conversation);
          } else {
            // If the message message user not me
            conversation.messages.push(message);
            setActiveConversation(conversation);
            setActiveConvo(conversation);
          }
        }
      }
    };

    socket?.on('message', handleMessage);

    return () => {
      socket?.off('message', handleMessage);
    };
  }, [socket, conversation, activeConversation, messages, lastMessage]);

  return (
    <Card
      className={classes.user}
      bg={active ? 'teal.5' : 'coco'}
      onClick={() => {
        setActiveConversation(conversation);
        setActiveConvo(conversation);
        updateActiveScreen('chat');
        handleRead();
      }}
      radius={active ? 'md' : '0'}
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
  if (message.user.email !== user.email) {
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
      hour12: true,
    });
  } else {
    // Return date in dd/mm/yy format
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }
}
