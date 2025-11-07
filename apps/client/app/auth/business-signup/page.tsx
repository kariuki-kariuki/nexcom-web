import CreateShop from '@/components/Shop/Create/CreateShop'
import { Category } from '@/lib/@types/shop'
import { datasource } from '@repo/shared-logic'
import { Text } from '@mantine/core'
import React from 'react'

const page = async () => {
  const {data} = await datasource.get<Category[]>('categories')
  if(!data) return <Text>No categories</Text>
  return (
    <CreateShop categoriesdb={data} />
  )
}

export default page