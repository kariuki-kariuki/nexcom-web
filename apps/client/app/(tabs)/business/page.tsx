import Shop from '@/components/Shop/Shop'
import { Shop as Ishop } from '@/lib/@types/shop'
import get from '@/utils/fetch'
import React from 'react'

const  page = async () => {
  const shops = await get<Ishop[]>('shops?name=all')
  return (
    <Shop shops={shops}/>
  )
}

export default page