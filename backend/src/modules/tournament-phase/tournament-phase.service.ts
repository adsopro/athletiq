import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TournamentPhase } from './tournament-phase.entity';
import { Tournament } from '../tournament/tournament.entity';

import { CreateTournamentPhaseDto } from './dto/create-tournament-phase.dto';
import { UpdateTournamentPhaseDto } from './dto/update-tournament-phase.dto';

@Injectable()
export class TournamentPhaseService {
  constructor(
    @InjectRepository(TournamentPhase)
    private readonly phaseRepository: Repository<TournamentPhase>,

    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  async create(dto: CreateTournamentPhaseDto) {
    const tournament = await this.tournamentRepository.findOne({
      where: {
        id: dto.tournamentId,
      },
    });

    if (!tournament) {
      throw new NotFoundException('Tournament not found');
    }

    let previousPhase: TournamentPhase | null = null;

    if (dto.previousPhaseId) {
      previousPhase = await this.phaseRepository.findOne({
        where: {
          id: dto.previousPhaseId,
        },
      });

      if (!previousPhase) {
        throw new NotFoundException('Previous phase not found');
      }
    }

    const phase = this.phaseRepository.create({
      tournament,

      previousPhase: previousPhase ?? undefined,

      name: dto.name,

      orderNumber: dto.orderNumber,

      phaseType: dto.phaseType,

      numberOfGroups: dto.numberOfGroups ?? 1,

      teamsPerGroup: dto.teamsPerGroup ?? 0,

      qualifiedTeamsPerGroup: dto.qualifiedTeamsPerGroup ?? 0,

      additionalQualifiedTeams: dto.additionalQualifiedTeams ?? 0,

      homeAndAway: dto.homeAndAway ?? false,

      allowDraws: dto.allowDraws ?? true,

      hasExtraTime: dto.hasExtraTime ?? false,

      hasPenaltyShootout: dto.hasPenaltyShootout ?? false,

      allowReinforcements: dto.allowReinforcements ?? false,

      maxReinforcements: dto.maxReinforcements ?? 0,

      automaticGeneration: dto.automaticGeneration ?? true,

      startDate: dto.startDate ? new Date(dto.startDate) : undefined,

      endDate: dto.endDate ? new Date(dto.endDate) : undefined,

      active: dto.active ?? true,
    });

    return this.phaseRepository.save(phase);
  }

  findAll() {
    return this.phaseRepository.find({
      relations: ['tournament', 'previousPhase', 'groups', 'matches'],
      order: {
        orderNumber: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const phase = await this.phaseRepository.findOne({
      where: {
        id,
      },
      relations: ['tournament', 'previousPhase', 'groups', 'matches'],
    });

    if (!phase) {
      throw new NotFoundException('Tournament phase not found');
    }

    return phase;
  }

  async update(id: number, dto: UpdateTournamentPhaseDto) {
    const phase = await this.findOne(id);

    if (dto.tournamentId) {
      const tournament = await this.tournamentRepository.findOne({
        where: {
          id: dto.tournamentId,
        },
      });

      if (!tournament) {
        throw new NotFoundException('Tournament not found');
      }

      phase.tournament = tournament;
    }

    if (dto.previousPhaseId) {
      const previous = await this.phaseRepository.findOne({
        where: {
          id: dto.previousPhaseId,
        },
      });

      if (!previous) {
        throw new NotFoundException('Previous phase not found');
      }

      phase.previousPhase = previous;
    }

    Object.assign(phase, {
      ...dto,

      startDate: dto.startDate ? new Date(dto.startDate) : phase.startDate,

      endDate: dto.endDate ? new Date(dto.endDate) : phase.endDate,
    });

    return this.phaseRepository.save(phase);
  }

  async remove(id: number) {
    const phase = await this.findOne(id);

    return this.phaseRepository.remove(phase);
  }
}
