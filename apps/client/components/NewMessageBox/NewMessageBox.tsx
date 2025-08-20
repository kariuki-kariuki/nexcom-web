'use client';

import {
  Flex,
  Group,
  Paper,
  Textarea,
  useMantineTheme
} from '@mantine/core';
import { useState } from 'react';
import classes from './NewMessageBox.module.css';
import { IconSend } from '@tabler/icons-react';
import { useSocketContext } from '@/lib/hooks/useSocket';
import { ConversationProps, NewMessage } from '@/lib/@types/app';
import { useGlobalStore } from '@/lib/context/global-store.provider';
import { EmojiPickerComponent } from '../EmojiPicker/EmojiPickerComponent';
import { FileWithPath } from '@mantine/dropzone';
import FilePicker from '../ui/FilePicker';
import MessageImagePreviews from '../Previews/MessageImagePrev';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

interface INewMessageBox {
  productId?: string;
  margin?: string | number
  convoId?: string
  close?: () => void;
  userId?: string;
  groupId?: string;
  radius?: string | number
}
const NewMessageBox = ({ productId, margin, convoId, groupId, close, userId, radius = 'xl' }: INewMessageBox) => {
  const [message, setMessage] = useState<string>('');
  const socket = useSocketContext()
  const addMessage = useGlobalStore((state) => state.addMessage)
  const addConversation = useGlobalStore((state) => state.addConversation)
  const conversations = useGlobalStore((state) => state.conversations)
  const conversation = conversations.find((convo) => convo.id === convoId);
  const user = conversation?.users[0];
  const [files, setFiles] = useState<FileWithPath[]>([])
  const processedFiles = files.map((file) => ({ mimetype: file.type, buffer: file }))
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const handleSubmit = async () => {
    if (!message && files.length === 0) return;
    const messageBody = {
      message,
      productId,
      receiverId: userId || user?.id,
      conversationId: convoId || groupId,
      files: processedFiles,
      groupId,
    };


    if (!convoId && !groupId) {
      socket.emit('new-conversation', messageBody, (res: ConversationProps) => {
        addConversation(res);
        console.log(res);
        if (productId) {
          notifications.show({
            title: 'Sent',
            message: "Message sent Succefuly",
            color: 'coco.4'
          })
        }
        setMessage('');
        setFiles([]);
        close?.();
      });
      return;
    }
    try {
      socket.emit('message', messageBody, (res: NewMessage) => {
        if (productId) {
          notifications.show({
            title: 'Sent',
            message: "Message sent Succefuly",
            color: 'coco.4'
          })
        }
        addMessage(res);
        setMessage('');
        setFiles([]);
        close?.();
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MessageImagePreviews files={files} setFiles={setFiles}  />
      <Paper pt={10} m={{ base: 'md', sm: margin }} shadow='lg' mih={{ base: 'auto', sm: 130 }} radius={radius} variant="div" px={mobile ? 'sm' : 'lg'} className={classes.msg}>
        <Textarea
          classNames={{ input: classes.textarea, wrapper: classes.textarea }}
          placeholder={"Enter Message"}
          value={message}
          className={classes.textarea}
          bd="none"
          onChange={(event) => setMessage(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSubmit();
            }
          }}
          minRows={mobile ? 2 : 3}
          maxRows={mobile ? 2 : 5}
          w={'100%'}
          bg="none"
          c={'white'}
        />
        <Flex w={'100%'} py={'md'} align={'center'} justify="space-between" gap={'md'}>
          <Group gap="md">
            <EmojiPickerComponent classes={{ emoji: classes.emoji }} />
            <FilePicker files={files} setFiles={setFiles} actionClick={handleSubmit} />
          </Group>
          <IconSend
            color="teal"
            className={classes.send}
            onClick={handleSubmit}
          />
        </Flex>
      </Paper>
    </>

  );
};

export default NewMessageBox;