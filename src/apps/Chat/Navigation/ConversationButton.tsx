import { Group, Avatar, Text, Card } from '@mantine/core';
import classes from './UserButton.module.css';
import { useContext } from 'react';
import { UserContextType } from '../../../@types/app';
import { AppContext } from '../../../context/appContext';
import { ConversationProps, UserProps } from '../../../@types/chat';
import {
  ConversationContext,
  activeConversatonType,
} from '../../../context/activeConversation';
import {
  ScreenContext,
  screenContextType,
} from '../../../context/screenContext';

interface Props {
  conversation: ConversationProps;
  open: () => void;
}
export function ConversationButton({ conversation, open }: Props) {
  const { user } = useContext(AppContext) as UserContextType;
  const { updateActiveScreen } = useContext(ScreenContext) as screenContextType;
  const { activeConversation, setActiveConversation } = useContext(
    ConversationContext,
  ) as activeConversatonType;
  const active: boolean = conversation.id == activeConversation?.id;
  let sender: UserProps | null;
  if (conversation.user_1?.email === user.email) {
    sender = conversation.user_2;
  } else {
    sender = conversation.user_1;
  }
  const messages = conversation.messages;
  const lastMessage = messages[messages.length - 1];

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
        <Avatar src={sender?.avatar} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" c="teal.4" fw={500}>
            {sender?.name}
          </Text>

          <Text c="dimmed" size="xs" lineClamp={1}>
            {lastMessage.message}
          </Text>
          <Group justify="flex-end">
            <Text c="teal" size="xs">
              {lastMessage.time}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
}
