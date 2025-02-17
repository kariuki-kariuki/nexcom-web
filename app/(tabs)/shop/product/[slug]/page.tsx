import ProductPage from '@/components/ProductPage/ProductPage'
import { Product } from '@/lib/@types/shop'
import { datasource } from '@/lib/common/datasource'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'

interface Param {
  params: { slug: string };
}
export async function generateMetadata({ params }: Param): Promise<Metadata> {
  const id = (await params).slug;
  const {data: product} = await datasource.get<Product>(`products/${id}`);
  if (!product) {
    return {};
  }

  return {
    title: `${product?.name} | Shop | Gift 
    | Ask`,
    description: product?.description,
    openGraph: {
      images: product?.images.map((image) => ({
        url: image.url,
        alt: image.altText,
        type: 'image/png',
        width: 1200,
        height: 630,
      })),
    },
    twitter: {
      title: product.name,
      card: 'summary_large_image',
      images: product.images.map((image) => image.url),
    },
  };
}

interface Params {
  slug: string
}
const page = async ({ params }: { params: Params }) => {
  const { data, error, loading } = await datasource.get<Product>(`products/${params.slug}`)
  if (error && !loading) return redirect('/shop')
  return (
    <>
      {data && <ProductPage product={data} />}
    </>
  )
}

export default page