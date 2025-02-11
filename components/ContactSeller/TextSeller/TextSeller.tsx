import { Box, Flex, Paper, ScrollArea } from '@mantine/core';
import classes from './ChatArea.module.css';
import {
  useActiveConversation
} from '@/lib/context/activeConversation';
import { useEffect, useRef } from 'react';
import { ConversationProps } from '@/lib/@types/app';
import { useChat } from '@/lib/context/ConversationContext';
import MessageCard from '@/components/MessageCard/MessageCard';
import NewMessageBox from '@/components/NewMessageBox/NewMessageBox';
import Bar from '@/components/Bar/Bar';
interface CloseProps {
  closes: () => void;
  activeConvo?: ConversationProps | null;
}

function ChatArea({ closes, activeConvo }: CloseProps) {

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom on new message or when conversation changes
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConvo]);
  activeConvo?.messages.sort((a, b) => {
    const timeA = new Date(
      a.created_at
    ).getTime();
    const timeB = new Date(
      b.created_at
    ).getTime();
    return timeA - timeB;
  });


  const messages = activeConvo?.messages?.map((message, idx) => (
    <MessageCard message={message} key={idx} />
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
          className={classes.scroll}
          scrollbars="y"
        >
          {activeConvo ? (
            <Box className={classes.clearfix}>{messages}</Box>
          ) : (
            <Box className={classes.empty}>
            </Box>
          )}
          <div ref={endOfMessagesRef} />
        </ScrollArea>
        <NewMessageBox />
      </Flex>
    </Paper>
  );
}

export default ChatArea;
