import classes from './MessageCard.module.css';
import { Box, Card, Group, Image, Paper, rem, Text } from '@mantine/core';
import { useGlobalContext } from '../../lib/context/appContext';
import { MessageState } from '../../lib/common/common';
import { IconCheck, IconChecks } from '@tabler/icons-react';
import { Message } from '@/lib/@types/app';
import Link from 'next/link';
import OgMessage from '../OgMessage/OgMessage';

interface Props {
  message: Message;
}

// Sent and received message card
const MessageCard = ({ message }: Props) => {
  const { user } = useGlobalContext();
  const status = message.user.id === user?.id;
  const date = new Date(message.updated_at);

  return status ? (
    <Paper
      className={`${status ? classes.float_right : classes.float_left}`}
      bg={'none'}
      mt={'xs'}
      mx={'md'}
      p={0}
    >
      <Card bg={'none'} className={classes.right} >
        <Box className={classes.box_right} m={0} >

          <Text className="font-serif" c={'white'} pr={0}>
            {message?.message}
          </Text>

          {message.product && (<OgMessage product={message.product} />)}

          <Group align="center" mt={0} pl={20} gap={'sm'} justify="end">
            <Text c={'gray.4'} fz={rem(10)} fw={100}>
              {`${date?.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              })}`}
            </Text>
            {message.state == MessageState.SENT && (
              <IconCheck size={14} />
            )}
            {message.state == MessageState.DELIVERED && (
              <IconChecks color="#EEEEEE" size={14} />

            )}
            {message.state == MessageState.READ && (
              <IconChecks color="lime" size={16} />
            )}
          </Group>
        </Box>

      </Card>

    </Paper>
  ) : <Paper
    className={classes.float_left}
    bg={'none'}
    mt={'xs'}
    mx={'md'}
    p={0}
  >
    <Card bg={'none'} className={classes.left}>
      <Box className={classes.box_left} m={0}>
        <Text className="font-serif" c={'white'} pr={0}>
          {message?.message}
        </Text>

        {message.product && (<OgMessage product={message.product} />)}
      
        <Group align="center" mt={-5} pl={20} gap={'sm'} justify="end">
          <Text c={'gray.4'} fz={rem(10)} fw={100}>
            {`${date?.toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            })}`}
          </Text>
        </Group>
      </Box>
    </Card>
  </Paper>;
};

export default MessageCard;
