import { NavbarNested } from '@/components/Shop/ShopNav/NavbarNested'
import React, { ReactNode } from 'react'
import classes from './styles.module.css'
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={classes.content}>
      <div className={classes.navContainer}>
        <NavbarNested />
      </div>
      <div className={classes.container}>
        {children}
      </div>
    </div>
  )
}

export default layout