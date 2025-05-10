'use client'
import { ConversationButton } from '../ConversationButton/ConversationButton';
import {
  Flex,
  Paper,
  ScrollArea
} from '@mantine/core';
import classes from './ConversationButtonList.module.css';
import { useDisclosure } from '@mantine/hooks';

import {
  ConversationProps
} from '@/lib/@types/app';
import SearchBar from '../SearchBar/SearchBar';
import { useGlobalStore } from '@/lib/context/global-store.provider';
import SearchModal from '../SearchModal/SearchModal';
import { useState } from 'react';
interface Props {
  open?: () => void;
}

export default function ConversationButtonList({
}: Props) {
  const conversationsState = useGlobalStore((state) => state.conversations)
  const [searchPhrase, setSearchPhrase] = useState('');
  let conversations = conversationsState.filter(
    (conversation) => conversation.messages.length !== 0
  );

  conversations = conversations.filter((conversation) => {
    if (searchPhrase === '') {
      return true;
    }
    return conversation.messages.some((message) =>
      message.message.toLowerCase().includes(searchPhrase.toLowerCase())
    ) || conversation.users[0].fullName.toLowerCase().includes(searchPhrase.toLowerCase());

  })
  const [open, { toggle }] = useDisclosure(false);
  conversations.sort((a, b) => {
    const timeA = new Date(
      a.messages[a.messages.length - 1].updated_at
    ).getTime();
    const timeB = new Date(
      b.messages[b.messages.length - 1].updated_at
    ).getTime();
    return timeB - timeA;
  });

  const conversation = conversations?.map((convo: ConversationProps, index) => (
    <ConversationButton
      conversation={convo}
      key={convo.id}
      index={index}
    />
  ));
  return (
    <Paper h="100%" className={classes.nav}>
      <Flex
        pos={'relative'}
        direction={'column'}
        h={'100%'}
        p={0}
        m={0}
        className={classes.flex}
      >

        <SearchBar value={searchPhrase} onChange={setSearchPhrase} />

        <ScrollArea bg={'none'} type="scroll" h={'100%'}>
          {conversation}
        </ScrollArea>
        <SearchModal />
      </Flex>
    </Paper>
  );
}

