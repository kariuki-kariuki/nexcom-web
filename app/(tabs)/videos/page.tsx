import VideoPlayer from '@/components/VideoPlayer/VideoPlayer'
import Videos from '@/components/Videos/Videos'
import { ProductVideo } from '@/lib/@types/shop'
import { datasource } from '@/lib/common/datasource'
import React from 'react'

const page = async () => {
  const {data, error, loading} = await datasource.get<ProductVideo[]>('product-videos')
  if(!data) return <div>No videos yet</div>
  return (
    <div>
      <Videos videos={data} />
    </div>
  )
}

export default page