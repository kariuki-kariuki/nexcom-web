import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import * as userAgent from 'express-useragent';

@Injectable()
export class UserAgentMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    userAgent.express()(req, res, next);
  }
}
