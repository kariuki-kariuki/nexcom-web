import React from 'react';
import { Title } from '@mantine/core';
import { Message } from '@repo/nexcom-types';
import { Messages } from '@/components/Messages/Messages';
import { get } from '@repo/shared-logic';

async function Page() {
  const messages = await get<Message[]>('messages');

  return (
    <div>

      {messages && <Messages messagesDb={messages} />}
      {!messages && <Title>No Messages yet</Title>}
    </div>
  );
}

export default Page;
