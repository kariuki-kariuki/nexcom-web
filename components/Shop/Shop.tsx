import React from 'react'
import ShopCard from '../ShopCard/ShopCard'
import classes from './Shop.module.css';
import { Shop } from '@/lib/@types/shop';

interface IProps {
  shops: Shop[] | null
}
const ShopComponent = ({shops}: IProps) => {
  return (
    <div className={classes.main}>
      {shops && shops.map(shop => <ShopCard key={shop.id} shop={shop}/>)}
      
    </div>
  )
}

export default ShopComponent