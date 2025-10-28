import { BlogInterface } from '@repo/nexcom-types'
import { get } from '@repo/shared-logic'
import React from 'react'

const page = ({ params }: { params: { slug: string } }) => {
    const blog = get<BlogInterface>(`blogs/${params.slug}`)
  return (
    <div>page</div>
  )
}

export default page