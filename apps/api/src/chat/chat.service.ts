import { Injectable } from '@nestjs/common';
import { ConversationsService } from './conversations/conversations.service';
import { MessagesService } from './messages/messages.service';
import { UpdateStateDTO } from './messages/dto/update-state.dto';
import { UsersService } from '../users/users.service';
import { IncomingMessageBody } from './dto/chat-gateway.dto';
import { ProjectIdType } from '../@types/types';
import { INewConverSation } from '../../utils/interfaces';

@Injectable()
export class ChatService {
  constructor(
    private readonly userService: UsersService,
    private readonly conversationService: ConversationsService,
    private readonly messageService: MessagesService,
  ) {}

  async getDetails(email: string, convoId: ProjectIdType) {
    const user = await this.userService.findOne(email);
    const conversation = await this.conversationService.findOne(convoId);
    return { user, conversation };
  }

  async newMessage(message: IncomingMessageBody, userId: string) {
    return await this.messageService.createMessage(message, userId);
  }

  async newConversation(props: INewConverSation) {
    return await this.conversationService.createConversation(props);
  }

  async updateMessageState(updateBody: UpdateStateDTO, email: string) {
    return await this.conversationService.findConversation(
      email,
      updateBody.state,
      updateBody.conversationId,
    );
  }

  async updateProfile(
    userId: string,
    status: string,
    file?: Express.Multer.File,
  ) {
    return await this.userService.updateProfile(userId, status, file);
  }
}
