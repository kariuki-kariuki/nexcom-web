import Shop from '@/components/Shop/Shop'
import SimpleRoute from '@/components/SimpleRoute/SimpleRoute'
import { Shop as Ishop } from '@/lib/@types/shop'
import get from '@/utils/fetch'
import React from 'react'
import classes from './styles.module.css';

const page = async () => {
  const shops = await get<Ishop[]>('shops?name=all')
  return (
    <div className={classes.main}>
      <SimpleRoute />
      <Shop shops={shops} />
    </div>

  )
}

export default page