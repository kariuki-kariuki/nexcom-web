import { useContext } from 'react';
import { ConversationProps } from '../../../@types/chat';
import { AppContext } from '../../../context/appContext';
import { UserContextType } from '../../../@types/app';
import { ConversationButton } from './ConversationButton';
import {
  Avatar,
  Flex,
  Group,
  Paper,
  ScrollArea,
  Text,
  Tooltip,
} from '@mantine/core';
import { IconHome, IconSearch, IconShoppingBag } from '@tabler/icons-react';
import classes from './Navigation.module.css';
import { SocketType } from '../Chat';
import { useNavigate } from 'react-router-dom';
interface Props {
  conversations: ConversationProps[];
  open: () => void;
  socket: SocketType;
  setActiveConvo: (convo: ConversationProps) => void;
  opened: boolean
}

const Navigation = ({ conversations, open, socket, setActiveConvo, opened }: Props) => {
  const navigate = useNavigate();
  const conversation = conversations?.map((convo: ConversationProps) => (
    <ConversationButton
      conversation={convo}
      key={convo.id}
      socket={socket}
      open={open}
      setActiveConvo={setActiveConvo}
    />
  ));
  const { user } = useContext(AppContext) as UserContextType;
  return (
    <Paper h='100%' className={classes.nav}>
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
          p='lg'
          justify='space-between'
          align='center'
          classNames={{ root: classes.group }}
          grow
        >
          <Group bg={'none'}>
            <Avatar src={user.photo} />
            <Text className={classes.navText}>{user.firstName}</Text>
          </Group>
          <Group gap={'20%'} justify='end'>
            <Tooltip label='home' color='grape'>
              <IconHome size={18} onClick={() => navigate('/')} />
            </Tooltip>
            <Tooltip label='shop' color='grape'>
              <IconShoppingBag size={18} onClick={() => navigate('/shop')} />
            </Tooltip>
            <IconSearch size={18} />
          </Group>
        </Group>
        <ScrollArea p={'5px'} bg={'none'} type='never'>
          {conversation}
        </ScrollArea>
      </Flex>
    </Paper>
  );
};

export default Navigation;
