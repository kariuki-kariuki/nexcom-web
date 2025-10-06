import React from 'react'
import classes from "./styles.module.css"
import SimpleHeader from '@/components/SimpleHeader/SimpleHeader'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={classes.container}>
      <SimpleHeader />
      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}

export default layout