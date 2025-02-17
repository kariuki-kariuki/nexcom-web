import classes from './MessageCard.module.css';
import { Box, Card, Divider, Group, Image, Paper, rem, Text } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { AppContext, useGlobalContext } from '../../lib/context/appContext';
import { MessageState } from '../../lib/common/common';
import { IconCheck, IconChecks } from '@tabler/icons-react';
import { Message, UserContextType } from '@/lib/@types/app';
import { Product } from '@/lib/@types/shop';
import { datasource } from '@/lib/common/datasource';
import { API_URL } from '@/lib/common/constans';
import ImageCarousel from '../Shop/shopcomponents/ImageCarousel';
import Link from 'next/link';

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

          {message.productId && (<Box py="sm">
            <Link className={classes.link} href={`/shop/product/${message.productId}`}><Text lineClamp={1} maw={200}>{`https://nexcom-ke.vercel.app/shop/product/${message.productId}`}</Text>
              {message.product &&<Image src={message.product.images[0].url} maw={400} mah={400}/>}
              </Link>
          </Box>)}

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

        {message.productId && (<Box py="sm">
          <Link className={classes.link} href={`/shop/product/${message.productId}`}><Text lineClamp={2} maw={200}>{`https://nexcom-ke.vercel.app/shop/product/${message.productId}`}</Text>
            {message.product &&<Image src={message.product.images[0].url} maw={400} mah={400}/>}
          </Link>
        </Box>)}
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
