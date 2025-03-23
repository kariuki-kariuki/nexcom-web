import React from 'react'
import ShopCard from '../ShopCard/ShopCard'
import classes from './Shop.module.css';

const Shop = () => {
  return (
    <div className={classes.main}>
      <ShopCard />
      <ShopCard />
    </div>
  )
}

export default Shop