import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { LEVEL_AUTHORIRY } from 'src/constants/levelAuthority';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  picture: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsBoolean()
  activated: boolean;

  @IsOptional()
  @IsEnum(LEVEL_AUTHORIRY)
  levelAuthority: LEVEL_AUTHORIRY;
}
