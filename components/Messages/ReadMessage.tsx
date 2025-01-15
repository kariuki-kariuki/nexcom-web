import React from 'react';
import { IconUserCircle } from '@tabler/icons-react';
import { Card, Divider, Group, rem, Stack, Text } from '@mantine/core';
import { Message } from '../../lib/@types/messages';
import styles from './ReadMessage.module.css';

function ReadMessage({ message }: { message: Message }) {
  return (
    <Card className={styles.card} shadow="lg">
      <Group c="scode.8" py="sm">
        <IconUserCircle style={{ height: rem(28), width: rem(28) }} />
        <Stack gap={2}>
          <Text c="scode.8">{message.name}</Text>
          <Text c="scode.8">{message.email}</Text>
        </Stack>
      </Group>
      <Divider className={styles.divider} />
      <Text c="dimmed" className={styles.subjectText}>
        Subject | {message.subject}
      </Text>
      <Divider className={styles.divider} />
      <Text className={styles.messageContent}>{message.message}</Text>
    </Card>
  );
}

export default ReadMessage;
