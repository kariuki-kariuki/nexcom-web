'use client';
import { ConversationButton } from '../ConversationButton/ConversationButton';
import { Flex, Paper, ScrollArea } from '@mantine/core';
import classes from './ConversationButtonList.module.css';
import { useDisclosure } from '@mantine/hooks';

import { ConversationProps } from '@/lib/@types/app';
import SearchBar from '../SearchBar/SearchBar';
import { useGlobalStore } from '@/lib/context/global-store.provider';
import SearchModal from '../SearchModal/SearchModal';
import { useState, useMemo } from 'react';

interface Props {
  open?: () => void;
}

export default function ConversationButtonList({}: Props) {
  const conversationsState = useGlobalStore((state) => state.conversations);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [open, { toggle }] = useDisclosure(false);

  // Filter conversations with useMemo to avoid unnecessary recomputation
  const filteredConversations = useMemo(() => {
    return conversationsState
      .filter((conversation) => conversation.messages.length !== 0)
      .filter((conversation) => {
        if (searchPhrase === '') return true;
        return (
          conversation.messages.some((message) =>
            message.message.toLowerCase().includes(searchPhrase.toLowerCase())
          ) ||
          conversation.users[0].fullName.toLowerCase().includes(searchPhrase.toLowerCase())
        );
      })
      .sort((a, b) => {
        const timeA = new Date(
          a.messages[a.messages.length - 1].updated_at
        ).getTime();
        const timeB = new Date(
          b.messages[b.messages.length - 1].updated_at
        ).getTime();
        return timeB - timeA;
      });
  }, [conversationsState, searchPhrase]);

  // Map conversations with useMemo to memoize the result
  const conversationButtons = useMemo(() => {
    return filteredConversations.map((convo: ConversationProps, index) => (
      <ConversationButton conversation={convo} key={convo.id} index={index} />
    ));
  }, [filteredConversations]);

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
          {conversationButtons}
        </ScrollArea>
        <SearchModal />
      </Flex>
    </Paper>
  );
}
