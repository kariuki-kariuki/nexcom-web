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
  useContext,
  useEffect} from 'react';
import { IconCheck, IconChecks, IconShoppingBag } from '@tabler/icons-react';
import clsx from 'clsx';
import { ConversationProps, GlobalUser, Message } from '@/lib/@types/app';
import {
  useActiveConversation
} from '@/lib/context/activeConversation';
import { ScreenContext, screenContextType } from '@/lib/context/screenContext';
import { MessageState } from '@/lib/common/common';
import { useSocketContext } from '@/lib/hooks/useSocket';
import { formatDate } from '@/utils/helpers';
import { useGlobalContext } from '@/lib/context/appContext';

interface Props {
  conversation: ConversationProps;
  open: () => void;
  index: number;
}
export function ConversationButton({
  conversation,
  open,
}: Props) {
  const { user: gUser } = useGlobalContext();
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

 if(count > 0){
  socket.emit('message-state', {
    state: MessageState.DELIVERED,
    conversationId: conversation.id
  });
 }
  return (
    <Card
      className={clsx({ [classes.active]: active, [classes.normal]: !active })}
      onClick={() => {
        setActiveConversation(conversation);
        updateActiveScreen('chat');
        if(count > 0){
          socket.emit('message-state', {
            state: MessageState.READ,
            conversationId: conversation.id
          });
        }
      }}
      radius={5}
      shadow='lg'
    >
      <Group onClick={open}>
        <Avatar src={user?.photo} radius="xl" />
        <div style={{ flex: 1 }}>
          <Text size="sm" c={active ? 'white' : 'teal'} fw={500}>
            {`${user?.firstName} ${user?.lastName}`}
          </Text>
          <Group py="3px" wrap='nowrap'>
          {lastMessage.productId && gUser?.id !== user.id ? <IconShoppingBag size={14}/> : ''}
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


