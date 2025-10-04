import CreateShop from '@/components/Create/CreateShop'
import { Text } from '@mantine/core'
import { Category } from '@repo/nexcom-types'
import { datasource } from '@repo/shared-logic'
import React from 'react'

const page = async () => {
  const {data} = await datasource.get<Category[]>('categories')
  if(!data) return <Text>No categories</Text>
  return (
    <CreateShop categoriesdb={data} />
  )
}

export default page