import { NavbarNested } from '@/components/Shop/ShopNav/NavbarNested'
import React, { ReactNode } from 'react'
import classes from './styles.module.css'
import { Category } from '@/lib/@types/shop'
import { datasource } from '@repo/shared-logic'
const layout = async ({ children }: { children: ReactNode }) => {
  const { data } = await datasource.get<Category[]>('categories')
  return (
    <div className={classes.content}>
      <div className={classes.navContainer}>
        <NavbarNested categoriesdb={data || []} />
      </div>
      <div className={classes.container}>
        {children}
      </div>
    </div>
  )
}

export default layout