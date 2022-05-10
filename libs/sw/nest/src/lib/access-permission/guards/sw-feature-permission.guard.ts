import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SwAuthService } from '../../auth/services/sw-auth.service';

@Injectable()
export class SwFeaturePermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private baseAuthService: SwAuthService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const data = this.reflector.get<Array<string> | string>('featurePermission', context.getHandler());
      const permissions = (data)
        ? (typeof data === 'string')
          ? [data]
          : data
        : [];
      if (permissions.length === 0) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const user = this.baseAuthService.verify(request.headers['authorization']);
      const hasRole = () => permissions.some((permission) => user.featurePermissions.includes(permission));
      return user && hasRole();
    } catch (e) {
      const res = context.switchToHttp().getResponse();
      res.status(HttpStatus.UNAUTHORIZED);
    }
  }
}
