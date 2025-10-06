import React from 'react';
import { IconUserCircle } from '@tabler/icons-react';
import { Card, Divider, Group, rem, Stack, Text } from '@mantine/core';
import { Message } from '@repo/nexcom-types';
import styles from './ReadMessage.module.css';

function ReadMessage({ message }: { message: Message }) {
  return (
    <Card className={styles.card} shadow="lg">
      <Group c="coco.0" py="sm">
        <IconUserCircle style={{ height: rem(28), width: rem(28) }} />
        <Stack gap={2}>
          <Text c="coco.0">{message.user.fullName}</Text>
          <Text c="coco.0">{message.user.fullName}</Text>
        </Stack>
      </Group>
      <Divider className={styles.divider} />
      <Text c="dimmed" className={styles.subjectText}>
        Subject | {message.message}
      </Text>
      <Divider className={styles.divider} />
      <Text className={styles.messageContent}>{message.message}</Text>
    </Card>
  );
}

export default ReadMessage;
