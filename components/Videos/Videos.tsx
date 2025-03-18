import { ProductVideo } from '@/lib/@types/shop'
import React from 'react'
import MiniPlayer from './MiniPlayer/MiniPlayer'
import classes from './Videos.module.css'
import SearchButton from '../SearchButton/SearchButton'


interface IProps { videos: ProductVideo[], slug: string }

const Videos = ({ videos, slug }: IProps) => {
  return (
    <div className={classes.main}>
      <SearchButton slug={slug}/>
      <div className={classes.videos}>
        {videos.map(video => <MiniPlayer video={video} key={video.id} />)}
      </div>
    </div>
  )
}

export default Videos