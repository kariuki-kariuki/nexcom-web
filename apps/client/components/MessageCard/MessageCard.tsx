import classes from './MessageCard.module.css';
import { Avatar, Box, Card, Group, Paper, rem, Text } from '@mantine/core';
import { MessageState } from '../../lib/common/common';
import { IconCheck, IconChecks } from '@tabler/icons-react';
import { Message } from '@/lib/@types/app';
import OgMessage from '../OgMessage/OgMessage';
import MessageImages from '../ui/MessageImages';
import { useGlobalStore } from '@/lib/context/global-store.provider';

interface Props {
  message: Message;
  isGroup?: boolean;
}

const MessageCard = ({ message, isGroup }: Props) => {
  const user = useGlobalStore((state) => state.user);
  const isOutgoing = message.user.id === user?.id;
  const date = new Date(message.updated_at);

  const getIconByState = () => {
    switch (message.state) {
      case MessageState.SENT:
        return <IconCheck size={14} />;
      case MessageState.DELIVERED:
        return <IconChecks color="#EEEEEE" size={14} />;
      case MessageState.READ:
        return <IconChecks color="lime" size={16} />;
      default:
        return null;
    }
  };

  return (
    <Paper
      className={isOutgoing ? classes.float_right : classes.float_left}
      bg={'none'}
      mt={'xs'}
      mx={'md'}
      p={0}
    >

      <Card bg="none" className={isOutgoing ? classes.right : classes.left}>
        <Group align='start'>
          {isGroup && !isOutgoing && <Avatar src={message.user.avatar?.signedUrl} name={message.user.fullName} />}
          <Paper className={isOutgoing ? classes.box_right : classes.box_left} m={0}>
            {isGroup && !isOutgoing && <Text c="teal.6">{message.user.fullName}</Text>}
            <MessageImages images={message.files} />
            <Text className="font-serif" pr={0}>
              {message?.message}
            </Text>

            {message.product && <OgMessage product={message.product} outGoing={isOutgoing} />}

            <Group align="center" mt={0} pl={20} gap={'sm'} justify="end">
              <Text c={'gray.4'} fz={rem(10)} fw={100}>
                {date.toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </Text>
              {getIconByState()}
            </Group>
          </Paper>
        </Group>
      </Card>
    </Paper >
  );
};

export default MessageCard;