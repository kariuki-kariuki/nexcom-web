import { Group, Modal, ThemeIcon } from '@mantine/core';
import { IconVideo, IconPhoneOutgoing, IconMicrophone, IconPhoneCalling } from '@tabler/icons-react';
import React from 'react';
import classes from './Streaming.module.css';
import { useActiveConversation } from '@/lib/context/activeConversation';
import useVideoStream from '@/lib/hooks/useVideoStream';
import { useDisclosure } from '@mantine/hooks';
import VideoPlayer from './VideoPlayer';
import ReceiveCall from './ReceiveCall';

function Streaming() {
  const { activeConversation } = useActiveConversation();
  const activeUser = activeConversation?.users[0]
  const [opened, {toggle}] = useDisclosure();

  return (
    <div>
      <Group justify="apart">
        <IconVideo stroke={1.5} className={classes.icon} onClick={toggle} />
        <IconPhoneOutgoing stroke={1.5} className={classes.icon} onClick={toggle} />
      </Group>
      <ReceiveCall />
      <Modal
        opened={opened}
        onClose={toggle}
        title={`Calling ${activeUser?.firstName || 'User'}`}
        classNames={{ header: classes.mdTitle, body: classes.body, content: classes.mdContent }}
        size="xl"
      >
        <VideoPlayer />
      </Modal>
    </div>
  );
}

export default Streaming;
