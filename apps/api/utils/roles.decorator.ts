import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../src/@types/types';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: [UserRoles, ...UserRoles[]]) => {
  return SetMetadata(ROLES_KEY, roles);
};
