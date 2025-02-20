'use client';

import {
  ActionIcon,
  Flex,
  Paper,
  Text,
  TextInput,
  useMantineColorScheme
} from '@mantine/core';
import { useContext, useState } from 'react';
import {
  ConversationContext,
  activeConversatonType,
  useActiveConversation
} from '@/lib/context/activeConversation';
import { Theme } from 'emoji-picker-react';
import classes from './NewMessageBox.module.css';
import EmojiPicker from 'emoji-picker-react';
import { useDisclosure } from '@mantine/hooks';
import { IconSend } from '@tabler/icons-react';
import { SocketType } from '../Chat/Chat';
import {
  useNewConverSationContext
} from '@/lib/context/newConversation';
import { useSocketContext } from '@/lib/hooks/useSocket';
import { useGlobalContext } from '@/lib/context/appContext';

interface INewMessageBox {
  productId?: string;
  close?: () => void;
}
const NewMessageBox = ({ productId, close }: INewMessageBox) => {
  const [message, setMessage] = useState<string>('');
  const socket = useSocketContext()
  const { user } = useGlobalContext()

  const { activeConversation } = useActiveConversation();
  const { newConversation } = useNewConverSationContext();

  const [opened, { toggle }] = useDisclosure(false);
  const { colorScheme } = useMantineColorScheme();
  function theme() {
    if (colorScheme === 'dark') {
      return Theme.DARK;
    } else if (colorScheme === 'light') {
      return Theme.LIGHT;
    }
    return Theme.AUTO;
  }
  const handleSubmit = async () => {
    if (activeConversation && message) {
      const messageBody = {
        message,
        conversationId: activeConversation?.id,
        productId
      };
      try {
        socket.emit('message', messageBody);
        setMessage('');
        {close && close()}
      } catch (e) {
        console.log(e);
      }
    }
    if (newConversation && message) {
      const messageBody = {
        message,
        userId: newConversation.id,
        productId,

      };
      try {
        socket?.emit('new-conversation', messageBody);
        setMessage('');
        {close && close()}
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <Paper pt={10} variant="div" px={'lg'} className={classes.msg}>
      <Flex w={'100%'} py={'md'} align={'center'} gap={'md'}>
        <ActionIcon bg={'none'} onClick={toggle}>
          <Text fz={'xl'}>😊</Text>
        </ActionIcon>
        <TextInput
          placeholder="message"
          value={message}
          className={classes.textarea}
          onChange={(event) => setMessage(event.currentTarget.value)}
          w={'100%'}
          c={'white'}
          disabled={activeConversation || newConversation ? false : true}
          rightSection={
            <IconSend
              color="teal"
              className={classes.send}
              onClick={handleSubmit}
            />
          }
        />
      </Flex>
      {false && 
        <EmojiPicker
          width={'100%'}
          lazyLoadEmojis={true}
          height={350}
          theme={theme()}
          open={true}
          className={classes.emoji}
          searchDisabled
        /> }
    </Paper>
  );
};

export default NewMessageBox;
