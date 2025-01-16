import { ConversationProps } from '../../lib/@types/chat';
import { ConversationButton } from '../ConversationButton/ConversationButton';
import {
  ActionIcon,
  Box,
  Flex,
  Group,
  Paper,
  ScrollArea,
  Tooltip,
  useMantineTheme
} from '@mantine/core';
import {
  IconCirclePlusFilled,
  IconHome,
  IconShoppingBag,
  IconShoppingCart
} from '@tabler/icons-react';
import classes from './ConversationButtonList.module.css';
import { SocketType } from '../Chat/Chat';
import SmallComponent from './SmallComponent';
import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import NewMessage from '../NewMessage/NewMessage';
import { AppContext } from '../../lib/context/appContext';
import {
  NewConversationContext,
  NewConversationType
} from '../../lib/context/newConversation';
import {
  activeConversatonType,
  ConversationContext
} from '../../lib/context/activeConversation';
import { redirect } from 'next/navigation';
import { GlobalUser, UserContextType } from '@/lib/@types/app';
interface Props {
  conversations: ConversationProps[];
  open: () => void;
  socket: SocketType;
  setActiveConvo: (convo: ConversationProps) => void;
  setConverSations: Dispatch<SetStateAction<ConversationProps[]>>;
}

export default function ConversationButtonList({
  conversations,
  open,
  socket,
  setActiveConvo,
  setConverSations
}: Props) {
  const { user } = useContext(AppContext) as UserContextType;
  const { newConversation, setNewConversation } = useContext(
    NewConversationContext
  ) as NewConversationType;
  conversations = conversations.filter(
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
  const { setActiveConversation } = useContext(
    ConversationContext
  ) as activeConversatonType;
  useEffect(() => {
    const handleConvo = (convo: ConversationProps) => {
      console.log('new convo', convo.users);
      if (convo.users[0].id === user?.id || convo.users[1].id === user?.id) {
        {
          convo.users = convo.users.filter(
            (userr: GlobalUser) => userr.id !== user.id
          );
          conversations = [...conversations, convo];
          console.log('conversation', conversations);
          setConverSations(conversations);
        }
        if (
          convo.users[0].id === newConversation?.id ||
          convo.users[1].id === newConversation?.id
        ) {
          convo.users = convo.users.filter(
            (userr: GlobalUser) => userr.id !== user.id
          );
          setNewConversation(null);
          setActiveConvo(convo);
          setActiveConversation(convo);
        }
      }
    };
    socket?.on('new-conversation', handleConvo);

    return () => {
      socket?.off('new-conversation', handleConvo);
    };
  }, [socket, conversations, newConversation]);

  const conversation = conversations?.map((convo: ConversationProps, index) => (
    <ConversationButton
      conversation={convo}
      key={convo.id}
      socket={socket}
      open={open}
      setActiveConvo={setActiveConvo}
      setConverSations={setConverSations}
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
        <Group
          h={'80'}
          px={{ base: 'lg', sm: 'lg' }}
          justify="space-between"
          align="center"
          classNames={{ root: classes.group }}
          grow
        >
          <SmallComponent />
          <Links />
        </Group>

        <ScrollArea p={'5px'} bg={'none'} type="scroll" h={'100%'}>
          {conversation}
        </ScrollArea>
        <AddPop open={open} />
      </Flex>
    </Paper>
  );
}
const Links = () => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return (
    <Group gap={mobile ? '20%' : '20%'} justify="end">
      <Tooltip label="home" color="teal">
        <IconHome size={18} onClick={() => redirect('/')} />
      </Tooltip>
      <Tooltip label="Shop" color="teal">
        <IconShoppingBag size={18} onClick={() => redirect('/shop')} />
      </Tooltip>
      <Tooltip label="Cart" color="teal">
        <IconShoppingCart size={18} onClick={() => redirect('/cart')} />
      </Tooltip>
    </Group>
  );
};

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
