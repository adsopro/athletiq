import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TournamentPhase } from './tournament-phase.entity';
import { Tournament } from '../tournament/tournament.entity';

import { TournamentPhaseController } from './tournament-phase.controller';
import { TournamentPhaseService } from './tournament-phase.service';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentPhase, Tournament])],
  controllers: [TournamentPhaseController],
  providers: [TournamentPhaseService],
  exports: [TournamentPhaseService, TypeOrmModule],
})
export class TournamentPhaseModule {}
