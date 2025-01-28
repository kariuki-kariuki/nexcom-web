import { Card, Group, Avatar, Text } from '@mantine/core'
import React from 'react'
import classes from './SimpleHeader.module.css'

const SimpleHeader = () => {
    return (
        <Card radius={0} shadow="lg" className={classes.card}>
            <Group justify="start">
                <Avatar src="/logos/logo.png" />
                <Text py="sm">Nexcom</Text>
            </Group>
        </Card>
    )
}

export default SimpleHeader