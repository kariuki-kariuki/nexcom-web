import Message from '../components/MessageCard';
import { useContext } from 'react';
import {
  ConversationContext,
  activeConversatonType,
} from '../../../context/activeConversation';
import Bar from './Bar';
import { Flex, Paper, ScrollArea } from '@mantine/core';
import NewMessageBox from '../components/NewMessageBox';
import classes from './ChatArea.module.css';
import { ConversationProps } from '../../../@types/chat';
export interface CloseProps {
  close: () => void;
  activeConvo?: ConversationProps | null;
}
function ChatArea({ close, activeConvo }: CloseProps) {
  // const { activeConversation } = useContext(
  //   ConversationContext,
  // ) as activeConversatonType;
  
  const messages = activeConvo?.messages?.map((message) => (
    <Message message={message} key={message?.id} />
  ));
  console.log(activeConvo);
  return (
    <Paper h={'100%'} radius={'md'} p={'0px'} m={'0px'}>
      <Flex
        pos={'relative'}
        direction={'column'}
        h={'100%'}
        p={'0px'}
        m={'0px'}
        className={classes.scroll}
      >
        <Bar close={close} />
        <ScrollArea h={'100%'} p={0} className={classes.scroll}>
          {messages}
        </ScrollArea>
        <NewMessageBox />
      </Flex>
    </Paper>
  );
}

export default ChatArea;
