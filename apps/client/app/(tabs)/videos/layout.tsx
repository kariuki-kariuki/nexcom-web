import { Box, Flex } from '@mantine/core';
import React, { ReactNode } from 'react'
import classes from './styles.module.css';
import SimpleHeader from '@/components/SimpleHeader/SimpleHeader';
import SimpleRoute from '@/components/SimpleRoute/SimpleRoute';

const VideoLayout = ({ children }: { children: ReactNode }) => {

    return (
        <div className={classes.main}>
            <div className={classes.header}>
                <SimpleRoute />
            </div>
            <div className={classes.section}>
               {children}
            </div>
        </div>

    )
}

export default VideoLayout;