import classes from './MessageCard.module.css';
import { Message } from '../../../../@types/chat';
import { Box, Card, Group, Paper, rem, Text } from '@mantine/core';
import { useContext } from 'react';
import { AppContext } from '../../../../context/appContext';
import { UserContextType } from '../../../../@types/app';
import { MessageState } from '../../../../common/common';
import { IconCheck, IconChecks } from '@tabler/icons-react';

interface Props {
  message: Message;
}

// Sent and received message card
const MessageCard = ({ message }: Props) => {
  const { user } = useContext(AppContext) as UserContextType;
  const status = message.user.id === user?.id;
  const date = new Date(message.updated_at);
  return (
    <Paper
      className={`${status ? classes.float_right : classes.float_left}`}
      bg={'none'}
      mt={'xs'}
      mx={'md'}
      p={0}
    >
      <Card bg={'none'} className={status ? classes.right : classes.left}>
        <Box className={status ? classes.box_right : classes.box_left} m={0}>
          <Text className="font-serif" c={'white'} pr={0}>
            {message?.message}
          </Text>
          <Group align="center" mt={-5} pl={20} gap={'sm'} justify="end">
            <Text c={'gray'} fz={rem(10)} fw={100}>
              {`${date?.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              })}`}
            </Text>
            {status && message.state == MessageState.SENT ? (
              <IconCheck size={14} />
            ) : (
              ''
            )}
            {status && message.state == MessageState.DELIVERED ? (
              <IconChecks color="#EEEEEE" size={14} />
            ) : (
              ''
            )}
            {status && message.state == MessageState.READ ? (
              <IconChecks color="lime" size={16} />
            ) : (
              ''
            )}
          </Group>
        </Box>
      </Card>
    </Paper>
  );
};

export default MessageCard;
