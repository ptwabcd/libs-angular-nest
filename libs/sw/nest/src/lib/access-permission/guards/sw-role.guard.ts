import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SwAuthService } from '../../auth/services/sw-auth.service';

@Injectable()
export class SwRoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private baseAuthService: SwAuthService,
  ) {
  }

  canActivate(context: ExecutionContext): boolean {
    try {
      const data = this.reflector.get<Array<number> | number>('role', context.getHandler());
      const roles = (data)
        ? (typeof data === 'number')
          ? [data]
          : data
        : [];
      if (roles.length === 0) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const user = this.baseAuthService.verify(request.headers['authorization']);
      const hasRole = () => roles.includes(user.identity);
      return user && hasRole();
    } catch (e) {
      const res = context.switchToHttp().getResponse();
      res.status(HttpStatus.UNAUTHORIZED);
    }
  }
}
