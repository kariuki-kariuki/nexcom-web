'use client'
import Message from '../../components/MessageCard/MessageCard';
import Bar from '../Bar/Bar';
import { Box, Paper, ScrollArea } from '@mantine/core';
import NewMessageBox from '../../components/NewMessageBox/NewMessageBox';
import classes from './ChatArea.module.css';
import { useEffect, useRef } from 'react';
import { useGlobalStore } from '@/lib/context/global-store.provider';
interface ChatAreaProps {
  activeConvoId: string
}

function ChatArea({ activeConvoId }: ChatAreaProps) {

  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const conversations = useGlobalStore(state => state.conversations);
  const activeConvo = conversations.find((conv) => conv.id === activeConvoId)

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
    <Message message={message} key={idx} />
  ));
  return (
    <Paper h={'100vh'} p={'0px'} m={'0px'} className={classes.chat_area}>

      <Bar activeConvoId={activeConvoId}/>
      <ScrollArea
        h={'100%'}
        py={0}
        className={classes.scroll}
        scrollbars="y"
      >
        <Box className={classes.clearfix}>{messages}</Box>
        <div ref={endOfMessagesRef} />
      </ScrollArea>
      <NewMessageBox  convoId={activeConvoId}/>
    </Paper>
  );
}

export default ChatArea;
