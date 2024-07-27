import { useContext } from 'react';
import { ConversationProps } from '../../../@types/chat';
import { AppContext } from '../../../context/appContext';
import { UserContextType } from '../../../@types/app';
import { ConversationButton } from './ConversationButton';
import { Avatar, Card, Flex, Group, Paper, ScrollArea, Text } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

interface Props {
  conversations: ConversationProps[];
  open: () => void;
}

const Navigation = ({ conversations, open }: Props) => {
  const conversation = conversations?.map((convo: ConversationProps, index) => (
    <ConversationButton conversation={convo} key={index} open={open} />
  ));
  // const token = localStorage.getItem("token")
  const { user } = useContext(AppContext) as UserContextType;
  return (
    <Paper h="100%" bg={'dark'} p={0}>
      <Flex
        bg={'dark'}
        pos={'relative'}
        direction={'column'}
        h={'100%'}
        p={0}
        m={0}
      >
        <Group
          h={'90'}
          p="lg"
          justify="space-between"
          bg={'purple'}
          align="center"
        >
          <Group>
            <Avatar src={user.avatar} />
            <Text>{user.name}</Text>
          </Group>

          <IconSearch size={18} />
        </Group>
        <ScrollArea p={'5px'} bg={'dark'} type='never'>
          {conversation}
        </ScrollArea>
      </Flex>
    </Paper>
  );
};

export default Navigation;
