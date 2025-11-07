import VideoPlayer from '@/components/Videos/MiniPlayer/MiniPlayer'
import Videos from '@/components/Videos/Videos'
import { ProductVideo } from '@/lib/@types/shop'
import { datasource } from '@repo/shared-logic'
import React from 'react'

interface Params {
  params: {
    slug: string
  }
}

const page = async ({params}: Params) => {
  const {data, error, loading} = await datasource.get<ProductVideo[]>('product-videos')
  if(!data) return <div>No videos yet</div>
  return (
    <div>
      <Videos videos={data} slug={params.slug} />
    </div>
  )
}

export default page