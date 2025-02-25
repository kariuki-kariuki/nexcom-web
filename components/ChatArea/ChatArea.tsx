import Message from '../../components/MessageCard/MessageCard';
import Bar from '../Bar/Bar';
import { Box, Paper, ScrollArea } from '@mantine/core';
import NewMessageBox from '../../components/NewMessageBox/NewMessageBox';
import classes from './ChatArea.module.css';
import { useEffect, useRef } from 'react';
import { ConversationProps } from '@/lib/@types/app';
import { useGlobalContext } from '@/lib/context/appContext';
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
    <Message message={message} key={idx} />
  ));
  return (
    <Paper h={'100%'} p={'0px'} m={'0px'} className={classes.chat_area}>
      <div
        className={classes.flex}
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
      </div>
        {/* <Box visibleFrom='lg' w="40%">{user && activeConvo && <Profile userClicked={activeConvo.users[0]}/>}</Box> */}
    </Paper>
  );
}

export default ChatArea;
