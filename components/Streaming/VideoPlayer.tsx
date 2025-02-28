import React, { useEffect } from 'react'
import classes from "./Streaming.module.css"
import useVideoStream from '@/lib/hooks/useVideoStream';
import { Group, ThemeIcon } from '@mantine/core';
import { IconMicrophone, IconVideo, IconPhoneCalling } from '@tabler/icons-react';
import useGlobalStore from '@/lib/store/globalStore';

const VideoPlayer = () => {
  const { callUser, incomingVideo, callAccepted, error, stream, videoRef, endSreaming } = useVideoStream()
  const activeConversation = useGlobalStore((state) => state.activeConversation) ;
  const activeUser = activeConversation?.users[0]

  useEffect(() => {

    return endSreaming()
  }, [])

  return (
    <div>
      <div className={classes.videoContainer}>
        {callAccepted && (
          <video
            autoPlay
            ref={incomingVideo}
            className={classes.userVideo}
            style={{ transform: 'rotateY(180deg)' }} // Mirrors the video
          />
        )}

        {stream && (
          <video
            autoPlay
            ref={(video) => {
              if (video) video.srcObject = stream
            }}
            className={classes.myVideo}
            style={{ transform: 'rotateY(180deg)' }} // Mirrors the video
          />
        )}
      </div>
      <Group py="md">
        <ThemeIcon><IconMicrophone className={classes.icon} /></ThemeIcon>
        <ThemeIcon><IconVideo className={classes.icon} /></ThemeIcon>
        <ThemeIcon>
          {stream && <IconPhoneCalling className={classes.icon} onClick={callUser} />}</ThemeIcon>
      </Group>
    </div>
  )
}

export default VideoPlayer