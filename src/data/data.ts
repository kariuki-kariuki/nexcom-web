// import { faker } from '@faker-js/faker';
// export interface UserProps {
//     id: string,
//     first_name: string,
//     email: string,
//     avatar: string,
//     last_name: string,
//     status: string
// }

// function createRandomUser(): UserProps {
//     return {
//         id: faker.string.uuid(),
//         avatar: faker.image.avatar(),
//         email: faker.internet.email(),
//         first_name: faker.person.firstName(),
//         last_name: faker.person.lastName(),
//         status: faker.lorem.sentence({min: 3, max: 7})
//     }
// }
// // export interface ConversationProps {
// //     id: string,
// //     messages: MessageProps[]
// //     sender: UserProps,
// //     receiver: UserProps,
// // }

// type MessageState = {
//     status: 'sent' | 'received';
// }
// export interface MessageProps {
//     id: string,
//     message: string,
//     time: string,
//     state: MessageState,
//     conversation_id: string
// }

// function getRandomMessageState(): MessageState {
//     const isSent: boolean = Math.random() < 0.5; // Randomly generates true or false
//     return { status: isSent ? 'sent' : 'received' };
// }

// function createRandomMessage(conversation_id: string): MessageProps {
//     return {
//         id: faker.string.uuid(),
//         message: faker.lorem.sentence({ min: 3, max: 100 }),
//         time: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }).toDateString(),
//         state: getRandomMessageState(),
//         conversation_id: conversation_id
//     }
// }

// function createRandomConversation(receiver: UserProps): ConversationProps {
//     const sender: UserProps = createRandomUser();
//     const id: string = faker.string.uuid();
//     const messages: MessageProps[] = [];
//     for (let i = 0; i < 10; i++) {
//         messages.push(createRandomMessage(id))
//     }
//     return {
//         id: id,
//         messages: messages,
//         sender: sender,
//         receiver: receiver,
//     }

// }

// const chats: ConversationProps[] = [];
// const receiver = createRandomUser();

// for (let i = 0; i < 10; i++) {
//     chats.push(createRandomConversation(receiver))
// }

// export default chats;