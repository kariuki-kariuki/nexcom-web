'use client'
import Message from '../../components/MessageCard/MessageCard';
import Bar from '../Bar/Bar';
import { Box, Paper, ScrollArea } from '@mantine/core';
import NewMessageBox from '../../components/NewMessageBox/NewMessageBox';
import classes from './ChatArea.module.css';
import { act, useEffect, useLayoutEffect, useRef } from 'react';
import { useGlobalStore } from '@/lib/context/global-store.provider';
import { useRouter } from 'next/navigation';
interface ChatAreaProps {
  activeConvoId: string
}

function ChatArea({ activeConvoId }: ChatAreaProps) {

  const conversations = useGlobalStore(state => state.conversations);
  const activeConvo = conversations.find((conv) => conv.id === activeConvoId)
  const router = useRouter();

  // Auto-scroll to the bottom on new message or when conversation changes
  const viewport = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (viewport.current) {
      viewport.current.scrollTop = viewport.current.scrollHeight;
    }
  }, [activeConvo?.id, activeConvo?.messages?.length]);

  if (!activeConvo) {
    router.push('/chat')
    return <></>;
  };

  const messages = activeConvo.messages?.map((message, idx) => (
    <Message message={message} key={idx} />
  ));
  return (
    <Paper h={'100vh'} p={'0px'} m={'0px'} className={classes.chat_area}>
      <Bar user={activeConvo.users[0]} />
      <ScrollArea
        h={'100%'}
        py={0}
        viewportRef={viewport}
        className={classes.scroll}
        scrollbars="y"
      >
        <Paper bg="none" className={classes.clearfix}>{messages}</Paper>
      </ScrollArea>
      <NewMessageBox convoId={activeConvoId} />
    </Paper>
  );
}

export default ChatArea;
