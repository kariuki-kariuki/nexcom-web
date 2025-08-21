"use client";

import { Title, Text, Image } from "@mantine/core";
import styles from "./GroupChatInfo.module.css";
import { IconUsersGroup } from "@tabler/icons-react";

export default function GroupChatInfo() {
    return (
        <section className={styles.section}>
            <div className={styles.bg}>
                <div className={styles.main}>
                    <div>
                        <Title order={1} className={styles.title}>
                            <IconUsersGroup stroke={1.5} size={36}/> Group Chat Made Simple
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
                </div>
            </div>
        </section>
    );
}
