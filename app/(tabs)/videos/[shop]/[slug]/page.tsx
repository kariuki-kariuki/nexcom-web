import VideoPage from '@/components/Videos/VideoPage.tsx/VideoPage'
import { ProductVideo } from '@/lib/@types/shop'
import { datasource } from '@/lib/common/datasource'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'

interface Params extends ParsedUrlQuery {
  slug: string,
  shop: string,
}

const page = async ({ params }: { params: Params }) => {
  const { data } = await datasource.get<ProductVideo>(`product-videos/${params.slug}`)
  return (
    <div>
      {data && <VideoPage video={data} /> }
    </div>
  )
}

export default page