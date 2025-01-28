import { Card, Group, Avatar, Text, Burger } from '@mantine/core'
import React from 'react'
import classes from './SimpleHeader.module.css'

function SimpleHeaderToggle({toggle}: {toggle: () => void}) {
  return (
    <Card radius={0} shadow="lg" className={classes.card}>
      <Group justify='space-between' pr="sm">
      <Group justify="start">
        <Avatar src="/logos/logo.png" />
        <Text py="sm">Nexcom</Text>
      </Group>
        <Burger onClick={toggle} />
      </Group>
    </Card>
  )
}

export default SimpleHeaderToggle