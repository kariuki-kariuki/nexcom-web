import BusinessPage from '@/components/BusinessPage/BusinessPage';
import SimpleRoute from '@/components/SimpleRoute/SimpleRoute';
import { Shop, ShopWithProducts } from '@/lib/@types/shop';
import { datasource } from '@/lib/common/datasource';
import React from 'react'


interface Params {
  params: {
    slug: string;
  }
}
const page = async ({ params }: Params) => {
  const { data } = await datasource.get<ShopWithProducts>(`shops?name=${params.slug}`)
  return (
    <>
      <BusinessPage shop={data} />
    </>
  )
}

export default page