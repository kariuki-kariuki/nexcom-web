import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { DiscordService } from '../../src/discord/discord.service';

@Injectable()
export class ErrorReportingMiddleware implements NestMiddleware {
  constructor(private readonly discordService: DiscordService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const originalSend = res.send;
    res.send = (body) => {
      if (res.statusCode >= 500) {
        let error: Error;

        if (body instanceof Error) {
          error = body;
        } else if (typeof body === 'object') {
          error = new Error(JSON.stringify(body));
        } else {
          error = new Error(body);
        }
        this.discordService.sendErrorToDiscord(error, {
          statusCode: res.statusCode,
          path: req.path,
          method: req.method,
          headers: req.headers,
          body: req.body,
        });
      }
      return originalSend.call(res, body);
    };
    next();
  }
}
