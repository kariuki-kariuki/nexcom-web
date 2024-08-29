import {
  ActionIcon,
  Flex,
  Paper,
  Text,
  TextInput,
  useMantineColorScheme,
} from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import {
  ConversationContext,
  activeConversatonType,
} from '../../../context/activeConversation';
import { Theme } from 'emoji-picker-react';
import classes from './style.module.css';
import { io, Socket } from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import { useDisclosure } from '@mantine/hooks';
import { IconSend } from '@tabler/icons-react';

const NewMessageBox = () => {
  const [message, setMessage] = useState('');
  const { activeConversation } = useContext(
    ConversationContext,
  ) as activeConversatonType;

  const [socket, setSocket] = useState<Socket | null>(null);
  const url = 'ws://192.168.100.16:3002';
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
  useEffect(() => {
    const token = localStorage.getItem('token');
    setSocket(
      io(url, {
        extraHeaders: {
          authorization: `Bearer ${token}`,
        },
      }),
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
        setMessage('');
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
          disabled={activeConversation ? false : true}
          rightSection={
            <IconSend
              color="teal"
              className={classes.send}
              onClick={handleSubmit}
            />
          }
        />
      </Flex>
      {activeConversation ? (
        <EmojiPicker
          width={'100%'}
          lazyLoadEmojis={true}
          height={350}
          open={opened}
          theme={theme()}
          className={classes.emoji}
        />
      ) : (
        ''
      )}
    </Paper>
  );
};

export default NewMessageBox;
