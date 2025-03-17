'use client';
import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import classes from './VideoPlayer.module.css';
import { ProductVideo } from '@/lib/@types/shop';

const VideoPlayer = ({ video }: { video: ProductVideo }) => {
  const [playing, setPlaying] = useState(false)
  return (
    <div className={classes.wrapper} onMouseOver={() => setPlaying(true)} onMouseOut={() => setPlaying(false)}>
      <div className={classes.innerWrapper}>
        <ReactPlayer url={video.url} height={'100%'} width={'100%'} controls playing={playing} loop />
      </div>
    </div>

  )
}

export default VideoPlayer