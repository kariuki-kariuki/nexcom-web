import { Group, Modal, ThemeIcon } from '@mantine/core';
import { IconVideo, IconPhoneOutgoing, IconMicrophone, IconPhoneCalling } from '@tabler/icons-react';
import React, { useEffect, useRef, useState } from 'react';
import classes from './Streaming.module.css';
import { useDisclosure } from '@mantine/hooks';
import { useActiveConversation } from '@/lib/context/activeConversation';
import useWebSocket from '@/lib/hooks/useWebsockets';

function Streaming() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [opened, { toggle }] = useDisclosure(false);
  const { callUser, incomigVideo, callAccepted } = useWebSocket()
  const { activeConversation } = useActiveConversation();
  const activeUser = activeConversation?.users[0]
  useEffect(() => {
    if (opened) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          setStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(() => setError('Unable to access your camera.'));
    } else if (stream) {
      // Stop the tracks when the modal closes
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [opened]);

  

  console.log(stream)
  if (error) {
    return <div className={classes.error}>{error}</div>;
  }

  return (
    <div>
      <Group justify="apart">
        <IconVideo stroke={1.5} className={classes.icon} onClick={toggle} />
        <IconPhoneOutgoing stroke={1.5} className={classes.icon} onClick={toggle} />
      </Group>
      <Modal
        opened={opened}
        onClose={toggle}
        title={`Calling ${activeUser?.firstName || 'User'}`}
        classNames={{ header: classes.mdTitle, body: classes.body, content: classes.mdContent }}
        size="xl"
      >
        <div>
          <div className={classes.videoContainer}>
            {callAccepted && (
              <video
                autoPlay
                ref={incomigVideo}
                className={classes.userVideo}
                style={{ transform: 'rotateY(180deg)' }} // Mirrors the video
              />
            )}

            {stream && (
              <video
                autoPlay
                ref={(video) => {
                  if (video) {
                    video.srcObject = stream;
                  }
                }}
                className={classes.myVideo}
                style={{ transform: 'rotateY(180deg)' }} // Mirrors the video
              />
            )}
          </div>
        </div>
        <Group py="md">
          <ThemeIcon><IconMicrophone className={classes.icon} /></ThemeIcon>
          <ThemeIcon><IconVideo className={classes.icon} /></ThemeIcon>
          <ThemeIcon><IconPhoneCalling className={classes.icon} onClick={() => {
            if(stream) return callUser({ stream });
          }}/></ThemeIcon>
        </Group>
      </Modal>
    </div>
  );
}

export default Streaming;
