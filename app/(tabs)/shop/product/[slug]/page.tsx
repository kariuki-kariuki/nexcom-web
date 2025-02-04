import ProductPage from '@/components/ProductPage/ProductPage'
import { Product } from '@/lib/@types/shop'
import { datasource } from '@/lib/common/datasource'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata = {
  title: 'Shop | Gift | More',
  description: 'Chat with Friends and Businesses'
};
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