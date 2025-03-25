import SimpleHeader from '@/components/SimpleHeader/SimpleHeader';
import React, { ReactNode } from 'react';
import classes from './Styles.module.css';
interface IProps {
  children: ReactNode
}
const layout = ({ children }: IProps) => {
  return (
    <div className={classes.main}>
      <SimpleHeader />
      <div className={classes.section}>{children}</div>
    </div>
  )
}

export default layout