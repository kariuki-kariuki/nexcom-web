import { Group, Modal } from '@mantine/core';
import { IconVideo, IconPhoneOutgoing } from '@tabler/icons-react';
import React from 'react';
import classes from './Streaming.module.css';
import { useDisclosure } from '@mantine/hooks';
import VideoPlayer from './VideoPlayer';
import ReceiveCall from './ReceiveCall';
import useGlobalStore from '@/lib/store/globalStore';

function Streaming() {
  const activeConversation = useGlobalStore((state) => state.activeConversation);
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
