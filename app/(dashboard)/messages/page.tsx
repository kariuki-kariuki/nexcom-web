import React from 'react';
import { Title } from '@mantine/core';
import { Messages } from '../../../components/Messages/Messages';
import SimpleRoute from '../../../components/SimpleRoute/SimpleRoute';
import { Message } from '../../../lib/@types/messages';
import get from '../../../utils/fetch';

async function Page() {
  const messages = await get<Message[]>('messages');

  return (
    <div>
      <SimpleRoute tag="All messages" main="Messages" />

      {messages && <Messages messagesDb={messages} />}
      {!messages && <Title>No Messages yet</Title>}
    </div>
  );
}

export default Page;
