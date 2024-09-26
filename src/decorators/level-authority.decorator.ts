import { SetMetadata } from '@nestjs/common';
import { LEVEL_AUTHORITY } from 'src/constants/levelAuthority';

export const LEVEL_AUTHORITY_KEY = 'levelAuthority';
export const LevelAuthority = (...levelAuthorities: LEVEL_AUTHORITY[]) =>
  SetMetadata(LEVEL_AUTHORITY_KEY, levelAuthorities);
