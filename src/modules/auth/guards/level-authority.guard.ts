import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LEVEL_AUTHORITY } from 'src/constants/levelAuthority';
import { LEVEL_AUTHORITY_KEY } from 'src/decorators/level-authority.decorator';

@Injectable()
export class LevelAuthorityGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredLevelAuthorities = this.reflector.getAllAndOverride<
      LEVEL_AUTHORITY[]
    >(LEVEL_AUTHORITY_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredLevelAuthorities) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredLevelAuthorities.some(
      (levelAuthority) => user.levelAuthority === levelAuthority,
    );
  }
}
