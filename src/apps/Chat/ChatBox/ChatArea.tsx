import Message from '../components/MessageCard';
import { useContext } from 'react';
import {
  ConversationContext,
  activeConversatonType,
} from '../../../context/activeConversation';
import Bar from './Bar';
import { AppContext } from '../../../context/appContext';
import { UserContextType } from '../../../@types/app';
import { UserProps } from '../../../@types/chat';
import { Flex, Paper, ScrollArea } from '@mantine/core';
import NewMessageBox from '../components/NewMessageBox';
export interface CloseProps {
  close: () => void;
}
function ChatArea({ close }: CloseProps) {
  const { activeConversation } = useContext(
    ConversationContext,
  ) as activeConversatonType;
  const { user } = useContext(AppContext) as UserContextType;
  let sender: UserProps | null;
  if (activeConversation?.user_1?.email === user.email) {
    sender = activeConversation?.user_2;
  } else if (activeConversation) {
    sender = activeConversation?.user_1;
  } else {
    sender = null;
  }
  const messages = activeConversation?.messages?.map((message) => (
    <Message message={message} key={message?.id} sender={sender} />
  ));

  return (
    <Paper h={'100%'} radius={'md'} p={'0px'} m={'0px'}>
      <Flex
        bg={'dark'}
        pos={'relative'}
        direction={'column'}
        h={'100%'}
        p={'0px'}
        m={'0px'}
      >
        <Bar close={close} />
        <ScrollArea h={'100%'} p={0}>
          {messages}
        </ScrollArea>
        <NewMessageBox />
      </Flex>
    </Paper>
  );
}

export default ChatArea;
