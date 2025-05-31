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
import { usePathname, useRouter } from 'next/navigation';
import { useMediaQuery } from '@mantine/hooks';

interface INewMessageBox {
  productId?: string;
  margin?: string | number
  convoId?: string
  close?: () => void;
  sellerId?: string;
}
const NewMessageBox = ({ productId, margin, convoId, close, sellerId }: INewMessageBox) => {
  const [message, setMessage] = useState<string>('');
  const socket = useSocketContext()
  const conversations = useGlobalStore(state => state.conversations);
  const activeConversation = conversations.find((conv) => conv.id === convoId);
  const inquiryConversation = conversations.find((convo) => convo.users[0].id === sellerId);

  console.log("Inquiry Conversation:", inquiryConversation);
  const setNewConversation = useGlobalStore((state) => state.setNewConversation);
  const newConversation = useGlobalStore((state) => state.newConversation);
  console.log('render');
  const addMessage = useGlobalStore((state) => state.addMessage)
  const addConversation = useGlobalStore((state) => state.addConversation)
  const [files, setFiles] = useState<FileWithPath[]>([])
  const processedFiles = files.map((file) => ({ mimetype: file.type, buffer: file }))
  const router = useRouter();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const pathame = usePathname();
  const isNewConversation = pathame?.startsWith('/chat/new')

  console.log(`Seller id: ${sellerId}, productId: ${productId}`)
  const handleSubmit = async () => {
    if (!message && files.length === 0) return;

    if (productId && sellerId) {
      const messageBody = {
        message,
        conversationId: inquiryConversation?.id,
        productId,
        receiverId: activeConversation?.users[0].id || inquiryConversation?.users[0].id,
        files: processedFiles,
      };
      console.log(productId);
      emit(messageBody);
      return;
    }
    function emit(messageBody: any) {
      try {
        socket.emit('message', messageBody, (res: NewMessage) => {
          addMessage(res);
          setMessage('');
          setFiles([]);
          close?.();
        });
      } catch (e) {
        console.log(e);
      }
    }
    if (activeConversation) {
      const messageBody = {
        message,
        conversationId: activeConversation?.id,
        receiverId: activeConversation?.users[0].id || inquiryConversation?.users[0].id,
        files: processedFiles,
      };
      emit(messageBody);
    }
    else if (newConversation && isNewConversation) {
      const messageBody = {
        message,
        receiverId: newConversation.id,
        productId,
        files: processedFiles,
      };

      try {
        socket?.emit('new-conversation', messageBody, (res: ConversationProps) => {
          setMessage('');
          setFiles([]);
          addConversation(res);
          router.push(`/chat/${res.id}`);
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <MessageImagePreviews files={files} setFiles={setFiles} />
      <Paper pt={10} m={{ base: 'md', sm: margin }} shadow='lg' mih={{ base: 'auto', sm: 130 }} radius="xl" variant="div" px={'lg'} className={classes.msg}>
        <Textarea
          classNames={{ input: classes.textarea, wrapper: classes.textarea }}
          placeholder={(activeConversation || newConversation || inquiryConversation) ? "Enter Message" : "Select a conversation or start a new message"}
          value={message}
          fz="lg"
          className={classes.textarea}
          bd="none"
          onChange={(event) => setMessage(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSubmit();
            }
          }}
          minRows={mobile ? 1 : 3}
          maxRows={mobile ? 1 : 3}
          w={'100%'}
          bg="none"
          c={'white'}
          disabled={activeConversation || inquiryConversation || isNewConversation ? false : true}
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