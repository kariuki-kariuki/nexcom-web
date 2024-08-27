import { ConversationProps } from '../../../@types/chat';
import { ConversationButton } from './ConversationButton';
import {
  ActionIcon,
  Box,
  Flex,
  Group,
  Paper,
  ScrollArea,
  Tooltip,
} from '@mantine/core';
import {
  IconCirclePlusFilled,
  IconHome,
  IconSearch,
  IconShoppingBag,
} from '@tabler/icons-react';
import classes from './Navigation.module.css';
import { SocketType } from '../Chat';
import { useNavigate } from 'react-router-dom';
import SmallComponent from './SmallComponent';
import { Dispatch, SetStateAction } from 'react';
interface Props {
  conversations: ConversationProps[];
  open: () => void;
  socket: SocketType;
  setActiveConvo: (convo: ConversationProps) => void;
  opened: boolean;
  setConverSations: Dispatch<SetStateAction<ConversationProps[]>>;
}

const Navigation = ({
  conversations,
  open,
  socket,
  setActiveConvo,
  // opened,
  setConverSations,
}: Props) => {
  const navigate = useNavigate();
  conversations.sort((a, b) => {
    const timeA = new Date(
      a.messages[a.messages.length - 1].updated_at,
    ).getTime();
    const timeB = new Date(
      b.messages[b.messages.length - 1].updated_at,
    ).getTime();
    return timeB - timeA;
  });
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
          p="lg"
          justify="space-between"
          align="center"
          classNames={{ root: classes.group }}
          grow
        >
          <SmallComponent />
          <Group gap={'20%'} justify="end">
            <Tooltip label="home" color="grape">
              <IconHome size={18} onClick={() => navigate('/')} />
            </Tooltip>
            <Tooltip label="shop" color="grape">
              <IconShoppingBag size={18} onClick={() => navigate('/shop')} />
            </Tooltip>
            <IconSearch size={18} />
          </Group>
        </Group>
        <ScrollArea p={'5px'} bg={'none'} type="never" h={'100%'}>
          {conversation}
        </ScrollArea>
        <Box className={classes.absolute}>
          <ActionIcon bg={'blue'} size={40}>
            <IconCirclePlusFilled size={20} color={'white'} />
          </ActionIcon>
        </Box>
      </Flex>
    </Paper>
  );
};

export default Navigation;
