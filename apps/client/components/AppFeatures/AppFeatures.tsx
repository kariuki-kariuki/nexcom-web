import { Container, Flex, Paper, Text, Title } from '@mantine/core'
import React from 'react'
import AppFeaturesCard, { AppFeaturesCardProps } from './AppFeaturesCard';
import classes from "./AppFeaturesCard.module.css"

const appFeatures: AppFeaturesCardProps[] = [
    {
        title: "End-to-End Encrypted Chat",
        image: "/e2e.png",
        content:
            "Our chat system is built with end-to-end encryption, ensuring that only you and your intended recipient can read the messages. Not even our servers have access — your conversations remain private and secure.",
        tags: ["security", "privacy", "messaging", "E2EE"],
    },
    {
        title: "Group Chat Made Simple",
        image: "/group-chat.png",
        content:
            "Connect with friends, family, or your entire team in secure group chats. Share messages, media, and ideas in real time. Organize communities, collaborate on projects, or just have fun chatting together.",
        tags: ["group chat", "collaboration", "real-time", "media sharing"],
    },
    {
        title: "Shopping & Business Made Easy",
        image: "/shopping.png",
        content:
            "Launch your own shop in just a few clicks. Manage products, update prices, and keep your catalog fresh with an intuitive interface. Customers can chat & inquire about items in real time, while you manage your business seamlessly from one place.",
        tags: ["ecommerce", "business", "dashboard", "real-time chat", "scalability"],
    },
    {
        title: "Performance Dashboard & Analytics",
        image: "/dashboard.png",
        content:
            "Stay on top of performance with an interactive dashboard. Track sales, growth, and customer engagement with powerful analytics that help you make smarter decisions.",
        tags: ["analytics", "dashboard", "growth tracking", "insights"],
    },
    {
        title: "Seamless Community & Marketplace",
        image: "/community.png",
        content:
            "Bring together people, products, and conversations in one place. Whether it’s for social communities, project collaboration, or marketplace interactions — the app adapts to your needs.",
        tags: ["community", "marketplace", "integration", "all-in-one"],
    },
    {
        title: "Seamless Payments",
        image: "/fintech.png",
        content:
            "Accept payments securely from anywhere in the world. With support for mobile money, cards, and digital wallets, you can provide customers with flexible, fast, and trusted payment options.",
        tags: ["payments", "fintech", "checkout", "secure", "global"],
    },
];

const AppFeatures = () => {
    return (
        <Paper className={classes.features} p="sm">
        <header>
            <Title ta="center" py="md" c="coco.5" className={classes.title}>Features</Title>
            <Text ta="center" mb="xl">What we offer on the go!</Text>
        </header>
        <Flex direction={{ base: "column", sm: "row" }} wrap="wrap" justify={"space-between"}>
            {appFeatures.map((feature) => <AppFeaturesCard key={feature.title} props={feature} />)}
        </Flex>
        </Paper>
    )
}

export default AppFeatures