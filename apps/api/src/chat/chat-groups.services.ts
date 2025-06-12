import { Injectable } from '@nestjs/common';
import { GroupsService } from './conversations/groups.service';
import {
  AddGroupMembersDTO,
  AddRemoveAdminDTO,
  CreateGroupDTO,
  UpdateGroupProfileDto,
} from './conversations/dto/create-conversation.dto';
import { MessagesService } from './messages/messages.service';
import { IncomingMessageBody } from './dto/chat-gateway.dto';

@Injectable()
export class ChatGroupsService {
  constructor(
    private readonly groupService: GroupsService,
    private readonly messageService: MessagesService,
  ) {}

  async addGroupMembers(adminId: string, addmembersDTO: AddGroupMembersDTO) {
    return this.groupService.addGroupMembers(adminId, addmembersDTO);
  }

  async addGroupAdmin(adminId: string, addAdminDTO: AddRemoveAdminDTO) {
    return this.groupService.addGroupAdmin(adminId, addAdminDTO);
  }

  async removeAdmin(moderatorId: string, removeAdminDTO: AddRemoveAdminDTO) {
    return this.groupService.removeAdmin(moderatorId, removeAdminDTO);
  }

  async newGroup(userId: string, createGroupDTO: CreateGroupDTO) {
    return this.groupService.createGroup(userId, createGroupDTO);
  }

  async groupMessage(message: IncomingMessageBody, userId: string) {
    return await this.messageService.createGroupMessage(message, userId);
  }

  async updateGroupProfile(userId: string, bodyDTO: UpdateGroupProfileDto) {
    return this.groupService.updateGroupProfile(userId, bodyDTO);
  }
}
