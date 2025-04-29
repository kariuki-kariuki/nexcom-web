import React, { ReactNode } from 'react'
import classes from './styles.module.css';
import SimpleNav from '@/components/SimpleNav/SimpleNav';

const ChatLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className={classes.main}>
    <div className={classes.nav}><SimpleNav /></div>
  <div className={classes.children}>{children}</div>
  </div>
  )
}

export default ChatLayout