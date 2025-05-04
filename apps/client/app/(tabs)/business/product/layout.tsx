import { NavbarNested } from '@/components/Shop/ShopNav/NavbarNested'
import React, { ReactNode } from 'react'
import classes from './styles.module.css'
import SimpleRoute from '@/components/SimpleRoute/SimpleRoute'
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={classes.content}>
      <div className={classes.navContainer}>
        <NavbarNested />
      </div>
      <div className={classes.container}>
        <SimpleRoute />
        {children}
      </div>
    </div>
  )
}

export default layout