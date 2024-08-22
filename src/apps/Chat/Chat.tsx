import Navigation from './Navigation/Navigation';
import { ConversationProps } from '../../@types/chat';
import { Card, Flex, Modal, useMantineColorScheme } from '@mantine/core';
import classes from './Chat.module.css';
import { useDisclosure } from '@mantine/hooks';
import ChatArea from './ChatBox/ChatArea/ChatArea';
import { useEffect, useState } from 'react';
import { url, url1 } from '../../data/url';
import { io, Socket } from 'socket.io-client';
export type SocketType = Socket | null;
export type activeType = (active: any) => void;

function Chat() {
  const token = localStorage.getItem('token');
  const [conversations, setConversation] = useState<ConversationProps[]>([]);
  const [socket, setSocket] = useState<SocketType>(null);
  useEffect(() => {
    setSocket(
      io(url1, {
        extraHeaders: {
          authorization: `Bearer ${token}`,
        },
      }),
    );
    fetch(`${url}/conversations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res: any) => {
      if (res.ok) {
        res.json().then((res: any) => {
          setConversation(res);
        });
      }
    });
  }, [setConversation]);
  const [activeConvo, setActiveConvo] = useState<ConversationProps | null>(
    null,
  );
  const [opened, { open, close }] = useDisclosure(false);
  const { colorScheme } = useMantineColorScheme();
  const bgColor = colorScheme === 'dark' ? 'gray.8' : 'gray';
  return (
    <Flex
      wrap="nowrap"
      gap={5}
      p={{ base: '0px', md: 'sm' }}
      h="100vh"
      bg={bgColor}
    >
      <Card
        className={classes.overflow}
        h="100%"
        w={{ sm: '40%', md: '30%' }}
        bg={bgColor}
        radius={'lg'}
        padding={2}
      >
        <Navigation
          conversations={conversations}
          setActiveConvo={setActiveConvo}
          open={open}
          socket={socket}
          opened={opened}
        />
      </Card>
      <Card
        visibleFrom="sm"
        className={`${classes.overflow}`}
        p={2}
        w={{ sm: '60%', md: '70%' }}
        bg={colorScheme == 'dark' ? 'dark' : 'black'}
        h="`100%"
        radius={'lg'}
      >
        <ChatArea close={close} activeConvo={activeConvo} />
      </Card>
      <Modal
        radius="md"
        opened={opened}
        onClose={close}
        hiddenFrom="sm"
        withCloseButton={false}
        p={'0px'}
        m={0}
        size={'100vh'}
        fullScreen
        classNames={{ root: classes.root }}
        padding={'0px'}
      >
        <Card
          className={`${classes.overflow}`}
          padding={'0px'}
          m={'0px'}
          h={'97vh'}
          bg={colorScheme == 'dark' ? 'dark' : 'teal'}
        >
          <ChatArea close={close} activeConvo={activeConvo} />
        </Card>
      </Modal>
    </Flex>
  );
}

export default Chat;
