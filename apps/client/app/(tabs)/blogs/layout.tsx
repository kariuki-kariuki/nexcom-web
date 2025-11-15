import SimpleHeader from '@/components/SimpleHeader/SimpleHeader'
import React from 'react'

const BlogsLayout = ({ children }: {children: React.ReactNode }) => {
  return (
    <div>
        <SimpleHeader />
        {children}
    </div>
  )
}

export default BlogsLayout