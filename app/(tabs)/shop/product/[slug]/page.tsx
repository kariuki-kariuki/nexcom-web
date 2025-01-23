import ProductPage from '@/components/ProductPage/ProductPage'
import { Product } from '@/lib/@types/shop'
import { datasource } from '@/lib/common/datasource'
import { redirect } from 'next/navigation'
import React from 'react'
interface Params {
  slug: string
}
const page = async ({ params }: { params: Params }) => {
  const { data, loading } = await datasource.get<Product>(`products/${params.slug}`)
  if (!data && !loading) return redirect('/shop')
  return (
    <>
      {data && <ProductPage product={data} />}
    </>
  )
}

export default page