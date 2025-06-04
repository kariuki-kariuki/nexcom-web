import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {}
