'use client';

import { Avatar, AvatarGroup, Box, Flex, Modal, Paper, Stack, Text } from '@mantine/core';
import classes from './Chat.module.css';
import { useDisclosure } from '@mantine/hooks';
import ChatArea from '../ChatArea/ChatArea';
import ConversationButtonList from '../ConversationButtonList/ConversationButtonList';
import { useGlobalStore } from '@/lib/context/global-store.provider';
import { use } from 'react';
import { ConvsersationType } from '../../lib/@types/app';

function Chat() {
  const conversations = useGlobalStore((state) => state.conversations)
  return (
    <Paper className={classes.container}>
      <div className={classes.main}>
        <Stack bg="none" justify='center' align='center'>
          <AvatarGroup w="fit-content">
            {conversations.filter(convo => convo.type === ConvsersationType.CONVERSATION).slice(0, 5).map((convo) => (
              <Avatar size="lg"
                key={convo.id}
                src={convo.users[0].avatar?.signedUrl}
                alt={convo.users[0].fullName}
                name={convo.users[0].fullName}
              />
            ))}
          </AvatarGroup>
          <Text py="md">Select a Conversation and start Talking</Text>
        </Stack>
      </div>
    </Paper>
  )
}

export default Chat;
