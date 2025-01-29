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
  activeConversatonType
} from '@/lib/context/activeConversation';
import { Theme } from 'emoji-picker-react';
import classes from './NewMessageBox.module.css';
import EmojiPicker from 'emoji-picker-react';
import { useDisclosure } from '@mantine/hooks';
import { IconSend } from '@tabler/icons-react';
import { SocketType } from '../Chat/Chat';
import {
  NewConversationContext,
  NewConversationType
} from '@/lib/context/newConversation';
import { datasource } from '@/lib/common/datasource';
import useWebSocket from '@/lib/hooks/useWebsockets';
import { useGlobalContext } from '@/lib/context/appContext';
interface Props {
  socket: SocketType;
}
const NewMessageBox = () => {
  const [message, setMessage] = useState<string>('');
  const socket = datasource.getSocket()
  const { user } = useGlobalContext()

  const { activeConversation } = useContext(
    ConversationContext
  ) as activeConversatonType;
  const { newConversation } = useContext(
    NewConversationContext
  ) as NewConversationType;

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
        conversationId: activeConversation?.id
      };
      try {
        socket.emit('message', messageBody);
        setMessage('');
      } catch (e) {
        console.log(e);
      }
    }
    if (newConversation && message) {
      const messageBody = {
        message,
        userId: user?.id
      };
      try {
        socket?.emit('new-conversation', messageBody);
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
      {activeConversation || newConversation ? (
        <EmojiPicker
          width={'100%'}
          lazyLoadEmojis={false}
          height={350}
          open={opened}
          theme={theme()}
          className={classes.emoji}
          searchDisabled
        />
      ) : (
        ''
      )}
    </Paper>
  );
};

export default NewMessageBox;
