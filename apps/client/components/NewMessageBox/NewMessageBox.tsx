'use client';

import {
  ActionIcon,
  Flex,
  Paper,
  Text,
  TextInput,
  useMantineColorScheme
} from '@mantine/core';
import { useState } from 'react';
import { Theme } from 'emoji-picker-react';
import classes from './NewMessageBox.module.css';
import EmojiPicker from 'emoji-picker-react';
import { useDisclosure } from '@mantine/hooks';
import { IconSend } from '@tabler/icons-react';
import {
  useNewConverSationContext
} from '@/lib/context/newConversation';
import { useSocketContext } from '@/lib/hooks/useSocket';
import { ConversationProps, NewMessage } from '@/lib/@types/app';
import { useGlobalStore } from '@/lib/context/global-store.provider';

interface INewMessageBox {
  productId?: string;
  close?: () => void;
}
const NewMessageBox = ({ productId, close }: INewMessageBox) => {
  const [message, setMessage] = useState<string>('');
  const socket = useSocketContext()
  const activeConversation = useGlobalStore(state => state.activeConversation);
  const setActiveConversation = useGlobalStore(state => state.setActiveConversation)
  const { newConversation, setNewConversation } = useNewConverSationContext();
  const addMessage = useGlobalStore((state) => state.addMessage)
  const addConversation = useGlobalStore((state) => state.addConversation)
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
        productId,
        receiverId: activeConversation.users[0].id,
      };
      try {
        socket.emit('message', messageBody, (res: NewMessage) => {
          addMessage(res)
        });
        setMessage('');
        { close && close() }
      } catch (e) {
        console.log(e);
      }
    }
    if (newConversation && message) {
      const messageBody = {
        message,
        receiverId: newConversation.id,
        productId,
      };
      try {
        socket?.emit('new-conversation', messageBody, (res: ConversationProps) => {
          setMessage('');
          setNewConversation(null)
          setActiveConversation(res)
          addConversation(res)
          { close && close() }
        });

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
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSubmit();
            }
          }}
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
        />}
    </Paper>
  );
};

export default NewMessageBox;
