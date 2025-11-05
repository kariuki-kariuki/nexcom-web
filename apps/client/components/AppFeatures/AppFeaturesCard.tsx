"use client"
import { Avatar, Card, CardSection, Divider, List, ListItem, Paper, Text, ThemeIcon, Title, useMantineColorScheme } from '@mantine/core'
import { IconCircleCheck } from '@tabler/icons-react';
import React from 'react'
import classes from "./AppFeaturesCard.module.css"

export interface AppFeaturesCardProps {
    title: string;
    image: string;
    content: string;
    tags: string[];
}

const AppFeaturesCard = ({ props }: { props: AppFeaturesCardProps }) => {
    const { colorScheme } = useMantineColorScheme()
    const srcRoute = colorScheme === "dark" ? "/images/features" : "/images/features/light"
    return (
            <Card radius={20} bg="none" className={classes.card}>
                <CardSection>
                    <Avatar w="100%" radius={0} h={'auto'} src={srcRoute + props.image} name={props.title} />
                </CardSection>
                <CardSection>
                    <Divider />
                </CardSection>
                <CardSection p="xl" withBorder>
                    <Title order={3} c="coco.5">{props.title}</Title>
                    <Paper py="md" bg="none">
                        <Text c="dimmed">{props.content}</Text>
                    </Paper>
                    <List spacing="xs"
                        size='sm'
                        icon={
                            <ThemeIcon color='coco.5' size={22}  radius="xl">
                                <IconCircleCheck size={16} />
                            </ThemeIcon>
                        }
                    >
                        {props.tags.map((tag) => <ListItem key={tag}>{tag}</ListItem>)}
                    </List>
                </CardSection>
            </Card>
    )
}

export default AppFeaturesCard