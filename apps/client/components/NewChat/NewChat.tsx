'use client'
import Bar from '../Bar/Bar';
import { Box, Paper, ScrollArea } from '@mantine/core';
import NewMessageBox from '../NewMessageBox/NewMessageBox';
import classes from './NewChat.module.css';
import { useRef } from 'react';
import { useGlobalStore } from '@/lib/context/global-store.provider';
import { GlobalUser } from '@/lib/@types/app';
import { useRouter } from 'next/navigation';
interface ChatAreaProps {
  user: GlobalUser
}

function NewChat({ user }: ChatAreaProps) {
  const loggedInUser = useGlobalStore((state) => state.user);
  const router = useRouter();
  const conversations = useGlobalStore((state) => state.conversations);
  const convo = conversations.find((convo) => convo.users[0].id === user.id)
  if (user.id === loggedInUser?.id) {
    router.push(`/chat`);
  } else if(convo){
    router.push(`/chat/${convo.id}`)
  }
  

  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  // Auto-scroll to the bottom on new message or when conversation changes

  return (
    <Paper h={'100vh'} p={'0px'} m={'0px'} className={classes.chat_area}>
      <Bar user={user}/>
      <ScrollArea
        h={'100%'}
        py={0}
        className={classes.scroll}
        scrollbars="y"
      >
        <Box className={classes.clearfix}></Box>
        <div ref={endOfMessagesRef} />
      </ScrollArea>
      <NewMessageBox userId={user.id}/>
    </Paper>
  );
}

export default NewChat;
