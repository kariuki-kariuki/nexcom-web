'use client'
import Message from '../../components/MessageCard/MessageCard';
import Bar from '../Bar/Bar';
import { Avatar, Group, Paper, ScrollArea, Text } from '@mantine/core';
import NewMessageBox from '../../components/NewMessageBox/NewMessageBox';
import { useEffect, useRef } from 'react';
import { useGlobalStore } from '@/lib/context/global-store.provider';
import { useRouter } from 'next/navigation';
interface ChatAreaProps {
  groupId: string
}
import classes from './GroupChatArea.module.css'
import GroupBar from '../GroupBar/GroupBar';

function GroupChatArea({ groupId }: ChatAreaProps) {

  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const conversations = useGlobalStore(state => state.conversations);
  const group = conversations.find((conv) => conv.id === groupId)
  const router = useRouter();

  // Auto-scroll to the bottom on new message or when conversation changes
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [group]);
  if(!group) {
    router.push('/chat')
    return <></>;
  };
  // group.messages.sort((a, b) => {
  //   const timeA = new Date(
  //     a.created_at
  //   ).getTime();
  //   const timeB = new Date(
  //     b.created_at
  //   ).getTime();
  //   return timeA - timeB;
  // });

  const messages = group.messages?.map((message, idx) => (
    <Message message={message} key={idx} />
  ));
  return (
    <Paper h={'100vh'} p={'0px'} m={'0px'} className={classes.chat_area}>
      <GroupBar group={group}/>
      <ScrollArea
        h={'100%'}
        py={0}
        className={classes.scroll}
        scrollbars="y"
      >
        <Paper bg="none" className={classes.clearfix}>{messages}</Paper>
        <div ref={endOfMessagesRef} />
      </ScrollArea>
      <NewMessageBox  convoId={groupId} groupId={groupId}/>
    </Paper>
  );
}

export default GroupChatArea;
