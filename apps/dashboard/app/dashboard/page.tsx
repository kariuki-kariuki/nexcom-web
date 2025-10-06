import Admin from '@/components/Admin/Admin'
import { Product } from '@repo/nexcom-types'
import { get } from '@repo/shared-logic'
import React from 'react'

const page = async () => {
       const products = await get<Product[]>('shops/myshop')
    
  return (
    <Admin products={products || []} />
  )
}

export default page