import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
// import { CreateConversationDTO } from './dto/create-conversation.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { CreateConversationDTO } from './dto/create-conversation.dto';
import { AuthenticatedRequest } from '../../@types/types';
import { MessageState } from '../../@types/chat/chat';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: AuthenticatedRequest) {
    return this.conversationsService.findAll(req.user.userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createConversation(
    @Body() createConversationDTO: CreateConversationDTO,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.conversationsService.createConversation({
      createConversationDTO,
      initiatorId: req.user.userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  async try(
    @Body() body: { state: MessageState },
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.conversationsService.findConversation(
      req.user.email,
      body.state,
    );
  }
}
