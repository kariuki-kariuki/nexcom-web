import CreateShop from '@/components/Shop/Create/CreateShop'
import { Category } from '@/lib/@types/shop'
import get from '@/utils/fetch'
import { redirect } from 'next/navigation'
import React from 'react'


const page = async () => {
  const categoriesdb = await get<Category[]>('categories')
  if(!categoriesdb){
    redirect('/chat')
  }
  return (
    <CreateShop categoriesdb={categoriesdb}/>
  )
}

export default page