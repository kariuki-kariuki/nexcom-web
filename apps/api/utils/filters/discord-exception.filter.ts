import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { DiscordService } from '../../src/discord/discord.service';

@Catch()
export class DiscordExceptionFilter implements ExceptionFilter {
  constructor(private readonly discordService: DiscordService) {}
  logger = new Logger(DiscordExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode =
      exception instanceof HttpException ? exception.getStatus() : 500;
    this.logger.debug('Response status', statusCode);
    process.env.NODE_ENV === 'development' &&
      this.logger.error('Error', request.body);
    if (exception instanceof Error) {
      // if (statusCode >= 500) {
      this.discordService.sendErrorToDiscord(exception, {
        statusCode,
        path: request.url,
        method: request.method,
        headers: request.headers,
        body: request.body,
      });
      // }
    }

    const message =
      exception instanceof Error ? exception.message : 'Internal Server Error';
    // let the default error handler do its job
    response.status(statusCode).json({
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
