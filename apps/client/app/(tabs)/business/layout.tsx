import SimpleRoute from '@/components/SimpleRoute/SimpleRoute'
import React from 'react'
import classes from "./styles.module.css"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={classes.container}>
      <SimpleRoute />
      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}

export default layout