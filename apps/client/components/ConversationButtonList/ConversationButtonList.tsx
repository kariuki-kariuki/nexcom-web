'use client';
import { ConversationButton } from '../ConversationButton/ConversationButton';
import { Divider, Flex, Paper, ScrollArea, SegmentedControl } from '@mantine/core';
import classes from './ConversationButtonList.module.css';
import { useDisclosure } from '@mantine/hooks';

import { ConversationProps, ConvsersationType } from '@/lib/@types/app';
import SearchBar from '../SearchBar/SearchBar';
import { useGlobalStore } from '@/lib/context/global-store.provider';
import SearchModal from '../SearchModal/SearchModal';
import { useState, useMemo } from 'react';
import { GroupButton } from '../GroupButton/GroupButton';

interface Props {
  open?: () => void;
}

export default function ConversationButtonList({ }: Props) {
  const conversationsState = useGlobalStore((state) => state.conversations);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [generalValue, setValue] = useState('all')
  
  // const [open, { toggle }] = useDisclosure(false);

  // Filter conversations with useMemo to avoid unnecessary recomputation
  const filteredConversations = useMemo(() => {
    return conversationsState.filter((convo) => {
      if (generalValue === 'all') return true;
      return convo.type === generalValue;
    })
      .filter((conversation) => {
        if (searchPhrase === '') return true;
        return (
          conversation.messages?.some((message) =>
            message.message.toLowerCase().includes(searchPhrase.toLowerCase())
          ) ||
          conversation.users[0].fullName.toLowerCase().includes(searchPhrase.toLowerCase())
        );
      })
      .sort((a, b) => {
        const timeA = a.messages.length > 1 ? new Date(
          a.messages[a.messages.length - 1].updated_at
        ).getTime() : new Date(a.created_at).getTime();
        const timeB = b.messages.length > 1 ? new Date(
          b.messages[b.messages.length - 1].updated_at
        ).getTime() : new Date(b.created_at).getTime();
        return timeB - timeA;
      });
  }, [conversationsState, searchPhrase, generalValue]);

  // Map conversations with useMemo to memoize the result
  const conversationButtons = useMemo(() => {
    return filteredConversations.map((convo: ConversationProps, index) => (
      convo.name ? <GroupButton conversation={convo} key={convo.id} index={index} /> : <ConversationButton conversation={convo} key={convo.id} index={index} />
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
        <Paper bg="none">
          <SegmentedControl
            value={generalValue}
            onChange={setValue}
            color='coco.4'
            radius="lg"
            size='md'
            withItemsBorders={true}
            transitionDuration={100}
            transitionTimingFunction='linear'
            data={[
              { label: "All", value: 'all' },
              { label: "Groups", value: ConvsersationType.GROUP }
            ]}
          />
        </Paper>
        <Divider my="sm" />
        <ScrollArea bg={'none'} type="scroll" h={'100%'}>
          {conversationButtons}
        </ScrollArea>
        <SearchModal />
      </Flex>
    </Paper>
  );
}
