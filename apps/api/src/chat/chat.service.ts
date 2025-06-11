import { Injectable } from '@nestjs/common';
import { ConversationsService } from './conversations/conversations.service';
import { MessagesService } from './messages/messages.service';
import { UpdateStateDTO } from './messages/dto/update-state.dto';
import { UsersService } from '../users/users.service';
import { INewConverSation } from 'utils/interfaces';
import { IncomingMessageBody } from './dto/chat-gateway.dto';
import { ProjectIdType } from '../@types/types';
import {
  CreateGroupDTO,
  AddRemoveAdminDTO,
  UpdateGroupProfileDto,
  AddGroupMembersDTO,
} from './conversations/dto/create-conversation.dto';

@Injectable()
export class ChatService {
  constructor(
    private readonly userService: UsersService,
    private readonly conversationService: ConversationsService,
    private readonly messageService: MessagesService,
  ) {}

  async addGroupMembers(adminId: string, addmembersDTO: AddGroupMembersDTO) {
    return this.conversationService.addGroupMembers(adminId, addmembersDTO);
  }

  async addGroupAdmin(adminId: string, addAdminDTO: AddRemoveAdminDTO) {
    return this.conversationService.addGroupAdmin(adminId, addAdminDTO);
  }

  async removeAdmin(moderatorId: string, removeAdminDTO: AddRemoveAdminDTO) {
    return this.conversationService.removeAdmin(moderatorId, removeAdminDTO);
  }
  async getDetails(email: string, convoId: ProjectIdType) {
    const user = await this.userService.findOne(email);
    const conversation = await this.conversationService.findOne(convoId);
    return { user, conversation };
  }

  async newGroup(userId: string, createGroupDTO: CreateGroupDTO) {
    return this.conversationService.createGroup(userId, createGroupDTO);
  }

  async newMessage(message: IncomingMessageBody, userId: string) {
    return await this.messageService.createMessage(message, userId);
  }

  async groupMessage(message: IncomingMessageBody, userId: string) {
    return await this.messageService.createGroupMessage(message, userId);
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

  async updateGroupProfile(userId: string, bodyDTO: UpdateGroupProfileDto) {
    return this.conversationService.updateGroupProfile(userId, bodyDTO);
  }

  async updateProfile(
    userId: string,
    status: string,
    file?: Express.Multer.File,
  ) {
    return await this.userService.updateProfile(userId, status, file);
  }
}
