import { ProductVideo } from '@/lib/@types/shop'
import React from 'react'
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import classes from './Videos.module.css'

const Videos = ({videos}: {videos: ProductVideo[]}) => {
  return (
    <div className={classes.main}>
        <div className={classes.videos}>
          {videos.map(video => <VideoPlayer video={video}/>)}
        </div>
    </div>
  )
}

export default Videos