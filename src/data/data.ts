import { faker } from '@faker-js/faker';
import { ConversationProps, Message, UserProps } from '../@types/chat';
// export interface UserProps {
//     id: string,
//     first_name: string,
//     email: string,
//     avatar: string,
//     last_name: string,
//     status: string
// }

function createRandomUser(): UserProps {
  return {
    id: Math.floor(Math.random() * 100),
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
    name: faker.person.firstName(),
    created_at: faker.date
      .between({
        from: '2020-01-01T00:00:00.000Z',
        to: '2030-01-01T00:00:00.000Z',
      })
      .toDateString(),
    login_attempts: Math.floor(Math.random() * 10),
  };
}
// export interface ConversationProps {
//     id: string,
//     messages: MessageProps[]
//     sender: UserProps,
//     receiver: UserProps,
// }

type MessageState = {
  status: 'sent' | 'received';
};
// export interface MessageProps {
//     id: number,
//     message: string,
//     time: string,
//     state: MessageState,
//     conversation_id: string
// }

function getRandomMessageState(): MessageState {
  const isSent: boolean = Math.random() < 0.5; // Randomly generates true or false
  return { status: isSent ? 'sent' : 'received' };
}

function createRandomMessage(id: number): Message {
  return {
    id: Math.floor(Math.random() * 100),
    message: faker.lorem.sentence({ min: 3, max: 100 }),
    time: faker.date
      .between({
        from: '2020-01-01T00:00:00.000Z',
        to: '2030-01-01T00:00:00.000Z',
      })
      .toDateString(),
    // state: getRandomMessageState(),
    // conversation_id: conversation_id
    sender_id: id,
  };
}

function createRandomConversation(receiver: UserProps): ConversationProps {
  const me: UserProps = createRandomUser();
  const id: number = Math.floor(Math.random() * 100);
  const messages: Message[] = [];
  for (let i = 0; i < 4; i++) {
    if (i % 2 == 0) {
      messages.push(createRandomMessage(me.id));
    } else {
      messages.push(createRandomMessage(receiver.id));
    }
  }
  return {
    id: id,
    messages: messages,
    user_1: me,
    user_2: receiver,
  };
}

const chats: ConversationProps[] = [];
const receiver = createRandomUser();

for (let i = 0; i < 3; i++) {
  chats.push(createRandomConversation(receiver));
}

export default chats;
