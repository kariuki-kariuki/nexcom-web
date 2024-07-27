import { useContext, useEffect, useState } from 'react';
import Navigation from './Navigation/Navigation';
import { ConversationProps } from '../../@types/chat';
import { ScreenContext, screenContextType } from '../../context/screenContext';
import chats from '../../data/data';
import {
  Card,
  Drawer,
  Group,
  Modal,
  useMantineColorScheme,
} from '@mantine/core';
import classes from './Chat.module.css';
import { useDisclosure } from '@mantine/hooks';
import ChatArea from './ChatBox/ChatArea';
function Chat() {
  // const token = localStorage.getItem("token");
  // const [conversations, setConversation] = useState<ConversationProps[]>([]);
  const { activeScreen } = useContext(ScreenContext) as screenContextType;
  // const {activeConversation} = useContext(ConversationContext) as activeConversatonType;
  // useEffect(() => {
  //   fetch(`${url}/conversation`
  //   , {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }).then((res: any) => {
  //     if (res.ok) {
  //       res.json().then((res: ConversationProps[]) => {
  //         setConversation(res);
  //       });
  //     }
  //   });
  // }, [setConversation]);
  const conversations: ConversationProps[] = chats;
  const [opened, { open, close }] = useDisclosure(false);
  const { colorScheme } = useMantineColorScheme();
  const bgColor = colorScheme === 'dark' ? 'black' : 'gray';
  return (
    <Group wrap="nowrap" gap={5} p={{md: 'sm'}} h="100vh" bg={bgColor}>
      <Card
        className={classes.overflow}
        h="98%"
        w={{ sm: '40%', md: '30%' }}
        bg={bgColor}
        radius={'lg'}
        padding={2}
      >
        <Navigation conversations={conversations} open={open} />
      </Card>
      <Card
        visibleFrom="sm"
        className={`${classes.overflow}`}
        p={2}
        w={{ sm: '60%', md: '70%' }}
        bg={colorScheme == 'dark' ? 'dark' : 'black'}
        h="98%"
        radius={'lg'}
      >
        <ChatArea close={close}/>
      </Card>
      <Modal
        radius="md"
        opened={opened}
        onClose={close}
        hiddenFrom="sm"
        withCloseButton={false}
        p={'0px'}
        m={0}
        size={'100%'}
        fullScreen
        className={classes.modal}
      >
        <Card
          className={`${classes.overflow}`}
          padding={'0px'}
          m={'0px'}
          bg={colorScheme == 'dark' ? 'dark' : 'teal'}
        >
          <ChatArea close={close}/>
        </Card>
      </Modal>
    </Group>
  );
}

export default Chat;
