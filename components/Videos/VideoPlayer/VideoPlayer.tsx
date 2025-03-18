'use client';
import React from 'react'
import ReactPlayer from 'react-player';

interface IProps {
  playing: boolean,
  url: string;
}
const VideoPlayer = ({playing, url}: IProps) => {
  return (
    <ReactPlayer url={url} height={'100%'} width={'100%'} playing={playing} loop />
  )
}

export default VideoPlayer;