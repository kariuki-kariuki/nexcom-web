import { CreateConversationDTO } from 'src/chat/conversations/dto/create-conversation.dto';

export interface INewConverSation {
  initiatorId: string;
  createConversationDTO: CreateConversationDTO;
}
