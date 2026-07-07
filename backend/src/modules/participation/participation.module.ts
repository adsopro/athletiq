import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Participation } from './participation.entity';

import { ParticipationService } from './participation.service';
import { ParticipationController } from './participation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Participation])],
  controllers: [ParticipationController],
  providers: [ParticipationService],
  exports: [ParticipationService, TypeOrmModule],
})
export class ParticipationModule {}
