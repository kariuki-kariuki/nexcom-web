'use client';
import React, { useState } from 'react'
import classes from './VideoPage.module.css';
import { ProductVideo } from '@/lib/@types/shop';
import VideoProductCard from '../VideoProductCard/VideoProductCard';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { Container } from '@mantine/core';

interface IProps {
  video: ProductVideo;
}
const VideoPage = ({ video }: IProps) => {
  const [playing, setPlaying] = useState(true);
  return (
    <Container bg="none" size="lg" h="100%">
      <div className={classes.main}>
        <div className={classes.section} onClick={() => setPlaying(prev => !prev)}>
          <VideoPlayer url={video.url} playing={playing} />
        </div>
        <div className={classes.items}>
          {video.product && <VideoProductCard product={video.product} />}
        </div>
      </div>
    </Container>
  )
}

export default VideoPage