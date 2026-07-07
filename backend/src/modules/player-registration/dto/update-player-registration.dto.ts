import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerRegistrationDto } from './create-player-registration.dto';

export class UpdatePlayerRegistrationDto extends PartialType(
  CreatePlayerRegistrationDto,
) {}
