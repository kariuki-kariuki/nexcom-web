import { ConversationButton } from '../ConversationButton/ConversationButton';
import {
  ActionIcon,
  Box,
  Flex,
  Paper,
  ScrollArea} from '@mantine/core';
import {
  IconCirclePlusFilled} from '@tabler/icons-react';
import classes from './ConversationButtonList.module.css';
import { useDisclosure } from '@mantine/hooks';
import NewMessage from '../NewMessage/NewMessage';

import {
  ConversationProps} from '@/lib/@types/app';
import { useChat } from '@/lib/context/ConversationContext';
import SearchBar from '../SearchBar/SearchBar';
interface Props {
  open: () => void;
}

export default function ConversationButtonList({
  open,
}: Props) {
  const { state } = useChat()
  const conversations = state.conversations.filter(
    (conversation) => conversation.messages.length !== 0
  );
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
      open={open}
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

        <SearchBar />

        <ScrollArea  bg={'none'} type="scroll" h={'100%'}>
          {conversation}
        </ScrollArea>
        <AddPop open={open} />
      </Flex>
    </Paper>
  );
}

interface IAddPopMenu {
  open: () => void;
}
function AddPop({ open }: IAddPopMenu) {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <Box className={classes.absolute}>
      <ActionIcon bg={'blue'} size={40} onClick={toggle}>
        <IconCirclePlusFilled size={20} color={'white'} />
      </ActionIcon>
      <NewMessage opened={opened} toggle={toggle} open={open} />
    </Box>
  );
}
