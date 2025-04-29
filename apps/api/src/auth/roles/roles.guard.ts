import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from 'src/@types/types';
import { ROLES_KEY } from 'utils/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflecor: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflecor.getAllAndOverride<UserRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    const user = context.switchToHttp().getRequest().user;
    const hasRequiredRole = requiredRoles.some((role) => user.role === role);
    return hasRequiredRole;
  }
}
