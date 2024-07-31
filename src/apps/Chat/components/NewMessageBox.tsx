import { Group, TextInput } from '@mantine/core';
import { useContext, useState } from 'react';
import {
  ConversationContext,
  activeConversatonType,
} from '../../../context/activeConversation';
import { ConversationProps, Message } from '../../../@types/chat';
import classes from './style.module.css';
import { IconSend } from '@tabler/icons-react';
const NewMessageBox = () => {
  const [message, setMessage] = useState('');
  const { activeConversation, setActiveConversation } = useContext(
    ConversationContext,
  ) as activeConversatonType;
  const handleSubmit = () => {
    if (message != '') {
      const new_message: Message = {
        message,
        time: new Date().toDateString(),
      };
      activeConversation?.messages?.push(new_message);
      if (activeConversation) {
        setActiveConversation(activeConversation);
        setMessage('');
      }
    }
    return activeConversation;
  };
  return (
    <Group pt={10} variant="div" justify="space-between">
      <TextInput
        placeholder="message"
        value={message}
        className={classes.textarea}
        onChange={(event) => setMessage(event.currentTarget.value)}
        w={'100%'}
        c={'white'}
        rightSection={
          <IconSend
            color="blue"
            className={classes.send}
            onClick={() => {
              const convo: ConversationProps | null = handleSubmit();
              if (convo) {
                setActiveConversation(convo);
              }
            }}
          />
        }
      />
    </Group>
  );
};

export default NewMessageBox;
