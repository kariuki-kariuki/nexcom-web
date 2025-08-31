"use client";

import { Title, Text, Image, Flex } from "@mantine/core";
import styles from "./security.module.css";

export default function Security() {
    return (
        <Flex
        direction={{ base: 'column-reverse', lg: 'row'}}
         className={styles.section
        }>
             <Image
                src="/images/e2e.jpg"
                alt="End-to-end encryption illustration"
                className={styles.illustration}
            />
            <div>
                <Title order={1} className={styles.title}>
                    🔒 End-to-End Encrypted Chat
                </Title>

                <Text className={styles.subtitle}>
                    Our chat system is built with <span className={styles.highlight}>end-to-end encryption</span>,
                    ensuring that only you and your intended recipient can read the messages.
                    Not even our servers have access — your conversations remain{" "}
                    <span className={styles.highlight}>private and secure</span>.
                </Text>
            </div>

           
        </Flex>
    );
}
