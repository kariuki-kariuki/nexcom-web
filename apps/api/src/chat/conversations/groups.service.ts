import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { WsException } from '@nestjs/websockets';
import { instanceToPlain } from 'class-transformer';
import { ConversationType } from '../../@types/types';
import {
  UpdateGroupProfileDto,
  CreateGroupDTO,
  AddGroupMembersDTO,
  AddRemoveAdminDTO,
} from './dto/create-conversation.dto';
import { Conversation } from './entities/Conversation.entity';
import { Image } from '../../shops/product_images/entities/image.entity';

@Injectable()
export class GroupsService extends ConversationsService {
  async updateGroupProfile(userId: string, updateDto: UpdateGroupProfileDto) {
    const { groupId, file } = updateDto;
    const group = await this.conversationRepo.findOne({
      where: {
        id: groupId,
        users: { id: userId },
        admins: { id: userId },
      },
      relations: {
        users: true,
        profile: true,
      },
    });

    if (!group) {
      console.log('No Group found');
      throw new WsException('Forbiden');
    }

    if (group.profile) {
      await this.awsService.deleteImage(group.profile.url);
      group.profile.url = await this.awsService.uploadFile(file, 'groups');
    } else {
      const profile = new Image();
      profile.url = await this.awsService.uploadFile(file, 'groups');
      profile.mimeType = file.mimetype;
      group.profile = profile;
    }
    const savedGroup = await this.conversationRepo.save(group);
    return { users: group.users, profile: savedGroup.profile, groupId };
  }

  async createGroup(userId: string, createGroupDTO: CreateGroupDTO) {
    const { membersId, groupName, file } = createGroupDTO;
    const user = await this.usersRepository.findOneByOrFail({ id: userId });
    const members = await Promise.all(
      membersId.map(
        async (id) => await this.usersRepository.findOneByOrFail({ id }),
      ),
    );

    const group = new Conversation();
    group.name = groupName;
    group.users = [...members, user];
    group.admins = [user];
    group.creator = user;
    group.type = ConversationType.GROUP;

    if (file) {
      const profile = new Image();
      profile.url = await this.awsService.uploadFile(file, 'groups');
      profile.mimeType = file.mimetype;
      const savedProfile = await this.imageRepo.save(profile);
      group.profile = savedProfile;
    }
    try {
      const newGroup = await this.conversationRepo.save(group);
      newGroup.messages = [];
      return newGroup;
    } catch (e) {
      console.log(e);
      throw new WsException('Failed To Create group');
    }
  }

  async addGroupMembers(adminId: string, addmembersDTO: AddGroupMembersDTO) {
    const { groupId, membersId } = addmembersDTO;
    const group = await this.conversationRepo.findOne({
      where: {
        id: groupId,
        admins: {
          id: adminId,
        },
      },
      relations: {
        users: true,
        messages: {
          user: true,
        },
        admins: true,
        profile: true,
      },
    });

    const newMembers = await Promise.all(
      membersId.map(
        async (id) =>
          await this.usersRepository.findOneByOrFail({
            id: id,
          }),
      ),
    );
    const oldUsers = group.users;

    group.users = [...group.users, ...newMembers];

    const savedGroup = await this.conversationRepo.save(group);

    return {
      users: oldUsers,
      newUsers: newMembers,
      savedGroup,
    };
  }

  async addGroupAdmin(adminId: string, addAdminDTO: AddRemoveAdminDTO) {
    const { userId, groupId } = addAdminDTO;
    const group = await this.conversationRepo.findOne({
      where: {
        id: groupId,
      },
      relations: {
        users: true,
        admins: true,
      },
    });

    const user = await this.usersRepository.findOneByOrFail({ id: userId });
    const IAMadmin = group.admins.some((admin) => admin.id === adminId);
    const userIsInGroup = group.users.some((usr) => usr.id === userId);
    if (!group || !user || !IAMadmin || !userIsInGroup) {
      throw new NotFoundException('Group Does Not Exist');
    }
    group.admins = [...group.admins, user];
    await this.conversationRepo.save(group);
    return { users: group.users, user: instanceToPlain(user) };
  }

  async removeAdmin(moderatorId: string, removeAdminDTO: AddRemoveAdminDTO) {
    const { groupId, userId: adminId } = removeAdminDTO;
    const group = await this.conversationRepo.findOne({
      where: {
        id: groupId,
        creator: {
          id: moderatorId,
        },
        admins: {
          id: adminId,
        },
      },
      relations: {
        admins: true,
        users: true,
      },
    });

    if (!group) {
      throw new ForbiddenException('No Group Found');
    }

    group.admins = group.admins.filter((admin) => admin.id !== adminId);
    await this.conversationRepo.save(group);

    return { users: group.users, userId: adminId };
  }
}
