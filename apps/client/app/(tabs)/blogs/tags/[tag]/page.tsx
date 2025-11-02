import get from '@/utils/fetch';
import { BlogResultInterFace } from '@repo/nexcom-types';
import React from 'react'

interface Params {
  params: {
    tag: string;
  }
}
const page = async ({params}: Params) => {
  const blogs = await get<BlogResultInterFace>(`blogs/public?tag=${params.tag}`)
  return ( 
    <div>page</div>
  )
}

export default page