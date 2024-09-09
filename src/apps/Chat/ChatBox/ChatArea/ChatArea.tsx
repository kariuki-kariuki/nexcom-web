import Message from '../../components/MessageCard/MessageCard';
import Bar from '../Bar/Bar';
import { Box, Flex, Paper, ScrollArea } from '@mantine/core';
import NewMessageBox from '../../components/NewMessageBox/NewMessageBox';
import classes from './ChatArea.module.css';
import { ConversationProps } from '../../../../@types/chat';
import {
  activeConversatonType,
  ConversationContext,
} from '../../../../context/activeConversation';
import { useContext, useEffect, useRef } from 'react';
import { SocketType } from '../../Chat';
interface CloseProps {
  closes: () => void;
  activeConvo?: ConversationProps | null;
  socket: SocketType;
}

function ChatArea({ closes, activeConvo, socket }: CloseProps) {
  const { activeConversation } = useContext(
    ConversationContext,
  ) as activeConversatonType;

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom on new message or when conversation changes
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [
    activeConvo?.messages,
    activeConversation?.messages,
    activeConvo,
    activeConversation,
  ]); // Triggers when messages change

  const messages = activeConversation?.messages?.map((message, idx) => (
    <Message message={message} key={idx} />
  ));
  return (
    <Paper h={'100%'} p={'0px'} m={'0px'} className={classes.chat_area}>
      <Flex
        pos={'relative'}
        direction={'column'}
        h={'100%'}
        p={'0px'}
        m={'0px'}
      >
        <Bar closes={closes} />
        <ScrollArea
          h={'100%'}
          py={0}
          px={{ sm: 'xl' }}
          className={classes.scroll}
          scrollbars="y"
        >
          {activeConversation ? (
            <Box className={classes.clearfix}>{messages}</Box>
          ) : (
            ''
          )}
          <div ref={endOfMessagesRef} />
        </ScrollArea>
        <NewMessageBox socket={socket} />
      </Flex>
    </Paper>
  );
}

export default ChatArea;
