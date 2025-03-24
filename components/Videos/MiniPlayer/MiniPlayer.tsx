'use client';
import React, { useState } from 'react'
import classes from './MiniPlayer.module.css';
import { ProductVideo } from '@/lib/@types/shop';
import Link from 'next/link';
import ReactPlayer from 'react-player';

const MiniPlayer = ({ video }: { video: ProductVideo }) => {
  const [playing, setPlaying] = useState(false)
  const shopname = video.product?.shop?.name.toLocaleLowerCase()
  return (
    <div className={classes.wrapper} onMouseOver={() => setPlaying(true)} onMouseOut={() => setPlaying(false)}>
      <Link href={`/videos/${shopname}/${video.id}`}>
        <div className={classes.innerWrapper}>
          <ReactPlayer url={video.url} height={'100%'} width={'100%'} playing={playing} loop />
        </div>
      </Link>
    </div>

  )
}

export default MiniPlayer