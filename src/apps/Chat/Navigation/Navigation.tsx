import { useContext } from 'react';
import { ConversationProps } from '../../../@types/chat';
import { AppContext } from '../../../context/appContext';
import { UserContextType } from '../../../@types/app';
import { ConversationButton } from './ConversationButton';
import { Avatar, Flex, Group, Paper, ScrollArea, Text } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import classes from './Navigation.module.css';
import { SocketType } from '../Chat';
interface Props {
  conversations: ConversationProps[];
  open: () => void;
  socket: SocketType
  setActiveConvo: (convo: ConversationProps) => void
}

const Navigation = ({ conversations, open, socket, setActiveConvo }: Props) => {
  const conversation = conversations?.map((convo: ConversationProps) => (
    <ConversationButton conversation={convo} key={convo.id} socket={socket} open={open} setActiveConvo={setActiveConvo}/>
  ));
  const { user } = useContext(AppContext) as UserContextType;
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
        <Group
          h={'80'}
          p="lg"
          justify="space-between"
          align="center"
          classNames={{ root: classes.group }}
        >
          <Group bg={'none'}>
            <Avatar src={user.photo} />
            <Text className={classes.navText}>{user.firstName}</Text>
          </Group>

          <IconSearch size={18} />
        </Group>
        <ScrollArea p={'5px'} bg={'none'} type="never">
          {conversation}
        </ScrollArea>
      </Flex>
    </Paper>
  );
};

export default Navigation;
