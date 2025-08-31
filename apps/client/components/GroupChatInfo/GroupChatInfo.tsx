"use client";

import { Title, Text, Image, Container, Flex } from "@mantine/core";
import styles from "./GroupChatInfo.module.css";
import { IconUsersGroup } from "@tabler/icons-react";

export default function GroupChatInfo() {
    return (
        <div className={styles.bg}>
            <Container size="lg">
            <Flex direction={{base: 'column', md: "row"}}className={styles.main}>
                <div>
                    <Title order={1} className={styles.title}>
                        <IconUsersGroup stroke={1.5} size={36} /> Group Chat Made Simple
                    </Title>

                    <Text className={styles.description}>
                        Connect with friends, family, or your entire team in secure{" "}
                        <strong>group chats</strong>. Share messages, media, and ideas in
                        real time — all with{" "}
                        <strong>end-to-end encryption</strong> to keep your conversations
                        safe. Organize communities, collaborate on projects, or just have
                        fun chatting together.
                    </Text>
                </div>
                <Image
                    src="/images/group-chat.jpeg"
                    alt="Group chat illustration"
                    className={styles.image}
                />
            </Flex>
            </Container>
        </div>

    );
}
