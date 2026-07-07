import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayerRegistration } from './player-registration.entity';
import { PlayerRegistrationService } from './player-registration.service';
import { PlayerRegistrationController } from './player-registration.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerRegistration])],
  controllers: [PlayerRegistrationController],
  providers: [PlayerRegistrationService],
})
export class PlayerRegistrationModule {}
