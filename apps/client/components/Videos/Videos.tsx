import { ProductVideo } from '@/lib/@types/shop'
import React from 'react'
import MiniPlayer from './MiniPlayer/MiniPlayer'
import classes from './Videos.module.css'
import SearchButton from '../SearchButton/SearchButton'
import { Container } from '@mantine/core'


interface IProps { videos: ProductVideo[], slug: string }

const Videos = ({ videos, slug }: IProps) => {
  return (
    <Container className={classes.main} size="xl">
      <SearchButton slug={slug}/>
      <div className={classes.videos}>
        {videos.map(video => <MiniPlayer video={video} key={video.id} />)}
      </div>
    </Container>
  )
}

export default Videos