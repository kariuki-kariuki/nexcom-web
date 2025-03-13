import React, { ReactNode } from 'react'
import classes from './styles.module.css';
import SimpleHeader from '@/components/SimpleHeader/SimpleHeader';

const BusinessLayout = ({ children }: { children: ReactNode }) => {

    return (
        <div className={classes.main}>
            <div className={classes.header}>
                <SimpleHeader />
            </div>
            <div className={classes.section}>
               {children}
            </div>
        </div>

    )
}

export default BusinessLayout;