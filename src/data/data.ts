import { faker } from '@faker-js/faker';
export interface User {
    id: string,
    first_name: string,
    email: string,
    avatar: string,
    last_name: string,
    status: string
}

function createRandomUser(): User {
    return {
        id: faker.string.uuid(),
        avatar: faker.image.avatar(),
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        status: faker.lorem.sentence({min: 3, max: 7})
    }
}
export interface Conversation {
    id: string,
    messages: Message[]
    sender: User,
    receiver: User,
}

type MessageState = {
    status: 'sent' | 'received';
}
export interface Message {
    id: string,
    message: string,
    time: string,
    state: MessageState,
    conversation_id: string
}

function getRandomMessageState(): MessageState {
    const isSent: boolean = Math.random() < 0.5; // Randomly generates true or false
    return { status: isSent ? 'sent' : 'received' };
}

function createRandomMessage(conversation_id: string): Message {
    return {
        id: faker.string.uuid(),
        message: faker.lorem.sentence({ min: 3, max: 10 }),
        time: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }).toDateString(),
        state: getRandomMessageState(),
        conversation_id: conversation_id
    }
}

function createRandomConversation(receiver: User): Conversation {
    const sender: User = createRandomUser();
    const id: string = faker.string.uuid();
    const messages: Message[] = [];
    for (let i = 0; i < 10; i++) {
        messages.push(createRandomMessage(id))
    }
    return {
        id: id,
        messages: messages,
        sender: sender,
        receiver: receiver,
    }

}

const chats: Conversation[] = [];
const receiver = createRandomUser();

for (let i = 0; i < 10; i++) {
    chats.push(createRandomConversation(receiver))
}

export default chats;