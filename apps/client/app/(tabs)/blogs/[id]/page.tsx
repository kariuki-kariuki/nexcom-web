import BlogPage from '@/components/Blogs/BlogPage/BlogPage';
import get from '@/utils/fetch';
import { BlogInterface } from '@repo/nexcom-types';
import { Metadata } from 'next';
import React from 'react'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> { 
    const id = params.id;
    const results = await get<BlogInterface>(`blogs/public/${id}`);
    if (!results) {
        return {};
    }

    return {
        title: `${results?.title} | Blogs | Nexcom`,
        description: results?.description,
        openGraph: {
            url: `https://nexcom-ke.vercel.app/blogs/${results.id}`,
            images: [
                {
                    url: results.featuredImage.signedUrl,
                    alt: results.title,
                    type: 'image/png',
                    width: 1200,
                    height: 630,
                },
            ],

        },
        twitter: {
            title: results.title,
            card: 'summary_large_image',
            images: [results.featuredImage.signedUrl],
        },
    };
}

interface Params {
  params: {
    id: string;
  }
}
const page = async ({params}: Params) => {
      const results = await get<BlogInterface>(`blogs/public/${params.id}`)
    
  return (
    <div>
        {results && <BlogPage blog={results} />}
    </div>
  )
}

export default page