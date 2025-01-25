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
import SmallComponent from './SmallComponent';
import { useContext } from 'react';
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
import { useRouter } from 'next/navigation';
import {
  ConversationProps,
  UserContextType
} from '@/lib/@types/app';
import { useChat } from '@/lib/context/ConversationContext';
interface Props {
  open: () => void;
}

export default function ConversationButtonList({
  open,
}: Props) {
  const { user } = useContext(AppContext) as UserContextType;
  const { newConversation, setNewConversation } = useContext(
    NewConversationContext
  ) as NewConversationType;
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
  const { setActiveConversation } = useContext(
    ConversationContext
  ) as activeConversatonType;

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
        <Group
          h={'80'}
          px={{ base: 'lg', sm: 'lg' }}
          p={{ base: 'sm', sm: 'lg' }}
          justify="space-between"
          align="center"
          classNames={{ root: classes.group }}
          grow
        >
          <SmallComponent />
          <Links />
        </Group>

        <ScrollArea px={'lg'} bg={'none'} type="scroll" h={'100%'}>
          {conversation}
        </ScrollArea>
        <AddPop open={open} />
      </Flex>
    </Paper>
  );
}
const Links = () => {
  const theme = useMantineTheme();
  const router = useRouter()

  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return (
    <Group gap={mobile ? '20%' : '20%'} justify="end">
      <Tooltip label="home" color="teal">
        <IconHome size={18} onClick={() => router.push('/')} />
      </Tooltip>
      <Tooltip label="Shop" color="teal">
        <IconShoppingBag size={18} onClick={() => router.push('/shop')} />
      </Tooltip>
      <Tooltip label="Cart" color="teal">
        <IconShoppingCart size={18} onClick={() => router.push('/shop/cart')} />
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
