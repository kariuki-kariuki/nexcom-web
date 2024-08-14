import { Group, TextInput } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import {
  ConversationContext,
  activeConversatonType,
} from '../../../context/activeConversation';
import classes from './style.module.css';
import { IconSend } from '@tabler/icons-react';
import { io, Socket } from 'socket.io-client';
const NewMessageBox = () => {
  const [message, setMessage] = useState('');
  const { activeConversation } = useContext(
    ConversationContext
  ) as activeConversatonType;

  const [socket, setSocket] = useState<Socket | null>(null);
  const url = 'ws://192.168.100.16:3002';

  useEffect(() => {
    const token = localStorage.getItem('token');
    setSocket(
      io(url, {
        extraHeaders: {
          authorization: `Bearer ${token}`,
        },
      })
    );
  }, [url, setSocket]);
  const handleSubmit = () => {
    if (activeConversation) {
      const messageBody = {
        message,
        conversation: activeConversation?.id,
      };
      try {
        socket?.emit('message', messageBody);
        setMessage('')
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <Group pt={10} variant='div' justify='space-between'>
      <TextInput
        placeholder='message'
        value={message}
        className={classes.textarea}
        onChange={(event) => setMessage(event.currentTarget.value)}
        w={'100%'}
        c={'white'}
        rightSection={
          <IconSend
            color='blue'
            className={classes.send}
            onClick={handleSubmit}
          />
        }
      />
    </Group>
  );
};

export default NewMessageBox;
