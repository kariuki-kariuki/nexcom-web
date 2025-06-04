// src/discord/discord.service.ts
import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { UsersService } from '../users/users.service';

@Injectable()
export class DiscordService {
  private readonly logger = new Logger(DiscordService.name);
  private readonly webhookUrl: string;

  constructor(private readonly usersService: UsersService) {
    this.webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!this.webhookUrl) {
      throw new Error(
        'DISCORD_WEBHOOK_URL is not defined in environment variables',
      );
    }
  }

  async sendErrorToDiscord(error: Error, context?: any) {
    const bot = await this.usersService.findOne('nexcom.bot@gmail.com');
    try {
      // Ensure stack trace isn't too long
      const stackTrace = error.stack || 'No stack trace available';
      const truncatedStack =
        stackTrace.length > 1000
          ? stackTrace.substring(0, 1000) + '... (truncated)'
          : stackTrace;

      // Prepare the embed
      const embed = {
        title: '🚨 Server Error',
        color: 16711680, // Red color as number
        fields: [
          {
            name: 'Error Message',
            value: error.message?.substring(0, 1000) || 'No error message',
          },
          {
            name: 'Error Type',
            value: error.name || 'Error',
          },
          {
            name: 'Stack Trace',
            value: `\`\`\`${truncatedStack}\`\`\``,
          },
        ],
        timestamp: new Date().toISOString(),
      };

      // Add context if available
      if (context) {
        const sanitizedContext = this.sanitizeContext(context);
        embed.fields.push({
          name: 'Context',
          value: `\`\`\`json\n${JSON.stringify(sanitizedContext, null, 2).substring(0, 1000)}\`\`\``,
        });
      }

      // Prepare the payload
      const payload = {
        username: 'Error Bot',
        avatar_url: bot?.avatar?.signedUrl || 'https://i.imgur.com/abcdefg.png', // Optional: Add your bot icon
        embeds: [embed],
      };

      // Send to Discord
      const response = await axios.post(this.webhookUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      this.logger.debug(
        `Error reported to Discord successfully: ${response.status}`,
      );
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        this.logger.error(
          `Discord API error: ${axiosError.response.status} - ${JSON.stringify(axiosError.response.data)}`,
        );
      } else {
        this.logger.error(`Failed to send error to Discord: ${err.message}`);
      }
    }
  }

  private sanitizeContext(context: any): any {
    try {
      const sanitized = { ...context };
      // Remove sensitive headers
      if (sanitized.headers) {
        if (sanitized.headers.authorization)
          delete sanitized.headers.authorization;
        if (sanitized.headers.cookie) delete sanitized.headers.cookie;
      }
      // Remove sensitive body fields
      if (sanitized.body) {
        const sensitiveFields = [
          'password',
          'newPassword',
          'confirmPassword',
          'token',
          'refreshToken',
        ];
        sensitiveFields.forEach((field) => {
          if (sanitized.body[field]) delete sanitized.body[field];
        });
      }
      return sanitized;
    } catch (e) {
      return { error: 'Could not sanitize context' };
    }
  }
}
