'use client';
import React, { useState } from 'react'
import classes from './VideoPage.module.css';
import { ProductVideo } from '@/lib/@types/shop';
import VideoProductCard from '../VideoProductCard/VideoProductCard';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { Container } from '@mantine/core';
import CommentSection from '../Comments/CommentSection';
import { useDisclosure } from '@mantine/hooks';
import Actions from '../Actions/Actions';
import MobileComment from '../Comments/MobileComment';

interface IProps {
  video: ProductVideo;
}
const VideoPage = ({ video }: IProps) => {
  const [playing, setPlaying] = useState(false);
  const [opened, { toggle }] = useDisclosure(false)
  
  return (
    <Container bg="none" p={{ base: '0px', md: "xl" }} size="lg" h="90vh">
      <div className={classes.main}>
        <div className={classes.section} onClick={() => setPlaying(prev => !prev)}>
          <VideoPlayer url={video.url} playing={playing} />
        </div>
        <div className={classes.items}>
          {video.product && <VideoProductCard product={video.product} />}
          <CommentSection video={video} />
        </div>
        <Actions opened={opened} toggle={toggle} video={video}/>
        <MobileComment video={video} opened={opened} toggle={toggle} />
      </div>
    </Container>
  )
}

export default VideoPage