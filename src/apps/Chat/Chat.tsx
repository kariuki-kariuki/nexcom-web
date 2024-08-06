import Navigation from './Navigation/Navigation';
import { ConversationProps } from '../../@types/chat';
// import chats from '../../data/data';
import { Card, Flex, Modal, useMantineColorScheme } from '@mantine/core';
import classes from './Chat.module.css';
import { useDisclosure } from '@mantine/hooks';
import ChatArea from './ChatBox/ChatArea';
import { useEffect, useState } from 'react';
import { url } from '../../data/url';
function Chat() {
  const token = localStorage.getItem('token');
  const [conversations, setConversation] = useState<ConversationProps[]>([]);
  useEffect(() => {
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
  const [opened, { open, close }] = useDisclosure(false);
  const { colorScheme } = useMantineColorScheme();
  const bgColor = colorScheme === 'dark' ? 'gray.8' : 'gray';
  return (
    <Flex
      wrap="nowrap"
      gap={5}
      p={{ base: 'md', md: 'sm' }}
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
        <Navigation conversations={conversations} open={open} />
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
        <ChatArea close={close} />
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
          <ChatArea close={close} />
        </Card>
      </Modal>
    </Flex>
  );
}

export default Chat;
