import { Card, Group, Avatar, Text, Button, rem } from '@mantine/core'
import React from 'react'
import classes from './SimpleHeader.module.css'
import { IconHome, IconMessageCircle, IconShoppingBag, IconShoppingCart } from '@tabler/icons-react'
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle'
import Link, { LinkProps } from 'next/link'
import DashboardLink from './DashboardLink'

const links = [
    { label: 'Home', link: '/', icon: IconHome },
    { label: 'Shop', link: '/shop', icon: IconShoppingBag },
    { label: 'Cart', link: '/shop/cart', icon: IconShoppingCart },
    { label: 'Chart', link: '/chart', icon: IconMessageCircle },
]
const SimpleHeader = () => {
    return (
        <Card radius={0} shadow="lg" className={classes.card}>
            <Group justify='space-between'>
                <Group justify="start">
                    <Avatar src="/logos/logo.png" />
                    <Text py="sm">Nexcom</Text>
                </Group>
                <Group gap={"lg"}>
                    {links.map((link, idx) => <Link href={link.link} className={classes.link} key={idx}>{link.label}</Link>)}
                    <DashboardLink />
                </Group>
                <ColorSchemeToggle />
            </Group>
        </Card>
    )
}

export default SimpleHeader