import classes from './style.module.css';
import { Message } from '../../../@types/chat';
import { Box, Card, Group, Paper, rem, Text } from '@mantine/core';
import { useContext } from 'react';
import { AppContext } from '../../../context/appContext';
import { UserContextType } from '../../../@types/app';

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
          <Group>
            <Text className="font-serif" c={'white'} py={0}>
              {message?.message}
            </Text>

            <Text c={'gray'} fz={rem(10)} fw={100} pt={15}>
              {`${date?.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}`}
            </Text>
          </Group>
        </Box>
      </Card>
    </Paper>
  );
};

export default MessageCard;
