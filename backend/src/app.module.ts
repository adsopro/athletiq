import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CategoryModule } from './modules/category/category.module';
import { ClubModule } from './modules/club/club.module';
import { TeamModule } from './modules/team/team.module';
import { PlayerModule } from './modules/player/player.module';
import { MatchModule } from './modules/match/match.module';
import { TournamentModule } from './modules/tournament/tournament.module';
import { ParticipationModule } from './modules/participation/participation.module';
import { TournamentPhaseModule } from './modules/tournament-phase/tournament-phase.module';
import { GroupModule } from './modules/group/group.module';
import { PlayerRegistrationModule } from './modules/player-registration/player-registration.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Andover02',
      database: 'athletiq',
      autoLoadEntities: true,
      synchronize: true,
    }),

    ClubModule,
    CategoryModule,
    TeamModule,
    PlayerModule,
    TournamentModule,
    TournamentPhaseModule,
    GroupModule,
    MatchModule,
    PlayerRegistrationModule,
    ParticipationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
