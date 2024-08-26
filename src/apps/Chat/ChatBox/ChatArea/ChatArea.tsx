import Message from '../../components/MessageCard';
import Bar from '../Bar/Bar';
import { Flex, Paper, ScrollArea } from '@mantine/core';
import NewMessageBox from '../../components/NewMessageBox';
import classes from './ChatArea.module.css';
import { ConversationProps } from '../../../../@types/chat';
import {
  activeConversatonType,
  ConversationContext,
} from '../../../../context/activeConversation';
import { useContext } from 'react';
export interface CloseProps {
  closes: () => void;
  activeConvo?: ConversationProps | null;
}
function ChatArea({ closes, activeConvo }: CloseProps) {
  const { activeConversation } = useContext(
    ConversationContext,
  ) as activeConversatonType;

  const messages = activeConvo?.messages?.map((message, idx) => (
    <Message message={message} key={idx} />
  ));
  return (
    <Paper
      h={'100%'}
      radius={'md'}
      p={'0px'}
      m={'0px'}
      className={classes.chat_area}
    >
      <Flex
        pos={'relative'}
        direction={'column'}
        h={'100%'}
        p={'0px'}
        m={'0px'}
      >
        <Bar closes={closes} />
        <ScrollArea h={'100%'} p={0} className={classes.scroll}>
          {activeConversation ? <div>{messages}</div> : ''}
        </ScrollArea>
        <NewMessageBox />
      </Flex>
    </Paper>
  );
}

export default ChatArea;
