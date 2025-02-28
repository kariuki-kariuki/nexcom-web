import {
  Group,
  Avatar,
  Text,
  Card,
  Badge,
  Flex,
  rgba,
  Box,
  useMantineTheme
} from '@mantine/core';
import classes from './ConversationButton.module.css';
import { IconCheck, IconChecks, IconShoppingBag } from '@tabler/icons-react';
import clsx from 'clsx';
import { ConversationProps, GlobalUser, Message, PayloadMessage } from '@/lib/@types/app';
import { MessageState } from '@/lib/common/common';
import { formatDate } from '@/utils/helpers';
import { useGlobalContext } from '@/lib/context/appContext';
import { useMediaQuery } from '@mantine/hooks';
import useGlobalStore from '@/lib/store/globalStore';
import { useSocketContext } from '@/lib/context/SocketContext';

interface Props {
  conversation: ConversationProps;
  open: () => void;
  index: number;
}
export function ConversationButton({
  conversation: convo,
  open,
}: Props) {
  const { user: gUser } = useGlobalContext();
  const updateMessage = useGlobalStore((state) => state.updateMessage)
  const setActiveConversation = useGlobalStore((state) => state.setActiveConversation)

  const activeConversation = useGlobalStore((state) => state.activeConversation)
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
  const conversation = sortConversations(convo);
  const active: boolean = conversation.id === activeConversation?.id;
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

  if (count > 0) {
    socket.emit('message-state', {
      state: MessageState.DELIVERED,
      conversationId: conversation.id,
      receiverId: conversation.users[0]
    }, (res: PayloadMessage) => {
      updateMessage(res)
    });
  }
  return (
    <Card
      className={clsx({ [classes.active]: active, [classes.normal]: !active })}
      onClick={() => {
        setActiveConversation( conversation)
        console.log(count)
        if (count > 0) {
          socket.emit('message-state', {
            state: MessageState.READ,
            conversationId: conversation.id,
            receiverId: conversation.users[0].id
          }, (res: PayloadMessage) => {
            updateMessage(res)
          });
        }
      }}
      radius={5}
      shadow='lg'
    >
      <Group onClick={open}>
        <Avatar src={user?.photo} size={mobile ? 'md' : 'lg'} radius="xl" />
        <div style={{ flex: 1 }}>
          <Text size="sm" c={active ? 'white' : 'teal'} fw={500}>
            {`${user?.firstName} ${user?.lastName}`}
          </Text>
          <Group py="3px" wrap='nowrap'>
            {lastMessage.productId && gUser?.id !== user.id ? <IconShoppingBag size={14} /> : ''}
            <Text c={active ? '' : 'dimmed'} size="xs" lineClamp={1}>
              {lastMessage?.message}
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

function sortConversations(conversation: ConversationProps) {
  conversation.messages = conversation.messages.sort((a, b) => {
    const timeA = new Date(
      a.created_at
    ).getTime();
    const timeB = new Date(
      b.created_at
    ).getTime();
    return timeA - timeB;
  });
  return conversation;
}


