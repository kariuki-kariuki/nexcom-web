import { Card, Group, Avatar, Text, Button, rem } from '@mantine/core'
import React from 'react'
import classes from './SimpleHeader.module.css'
import SimpleHeaderLinks from './SimpleHeaderLinks/SimpleHeaderLinks'
import SearchByImage from '../SearchByImage/SearchByImage'
import MenuDrop from '../Menudrop/MenuDrop'


const SimpleHeader = () => {
    return (
        <Card radius={0} shadow="lg" className={classes.card}>
            <Group justify='space-between'>
                <Group justify="start">
                    <Avatar src="/logos/logo.png" />
                    <Text py="sm">Nexcom</Text>
                </Group>
                <SimpleHeaderLinks />
            </Group>
        </Card>
    )
}

export default SimpleHeader