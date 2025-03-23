import CreateShop from '@/components/Shop/Create/CreateShop'
import { Category } from '@/lib/@types/shop'
import get from '@/utils/fetch'
import React from 'react'

const page = async () => {
  const res = await get<Category[]>('categories')
  if(!res){
    return;
  }
  return (
    <CreateShop categoriesdb={res} />
  )
}

export default page