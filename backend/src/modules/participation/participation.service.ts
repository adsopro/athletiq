import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Participation } from './participation.entity';

import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';

@Injectable()
export class ParticipationService {
  constructor(
    @InjectRepository(Participation)
    private readonly participationRepository: Repository<Participation>,
  ) {}

  async create(dto: CreateParticipationDto) {
    const participation = this.participationRepository.create({
      isReinforcement: dto.isReinforcement ?? false,

      positionPlayed: dto.positionPlayed,

      jerseyNumber: dto.jerseyNumber,

      minutesPlayed: dto.minutesPlayed ?? 0,

      goals: dto.goals ?? 0,
      assists: dto.assists ?? 0,
      shots: dto.shots ?? 0,
      shotsOnTarget: dto.shotsOnTarget ?? 0,

      passesCompleted: dto.passesCompleted ?? 0,
      keyPasses: dto.keyPasses ?? 0,

      tackles: dto.tackles ?? 0,
      interceptions: dto.interceptions ?? 0,
      recoveries: dto.recoveries ?? 0,
      clearances: dto.clearances ?? 0,
      blocks: dto.blocks ?? 0,

      saves: dto.saves ?? 0,
      goalsConceded: dto.goalsConceded ?? 0,

      yellowCards: dto.yellowCards ?? 0,
      redCards: dto.redCards ?? 0,

      playerOfTheMatch: dto.playerOfTheMatch ?? false,

      coachRating: dto.coachRating,

      notes: dto.notes,

      playerRegistration: {
        id: dto.playerRegistrationId,
      } as any,

      match: {
        id: dto.matchId,
      } as any,
    });

    return this.participationRepository.save(participation);
  }

  findAll() {
    return this.participationRepository.find({
      relations: [
        'playerRegistration',
        'playerRegistration.player',
        'playerRegistration.team',
        'playerRegistration.category',
        'playerRegistration.tournament',
        'match',
      ],
    });
  }

  async findOne(id: number) {
    const participation = await this.participationRepository.findOne({
      where: { id },
      relations: [
        'playerRegistration',
        'playerRegistration.player',
        'playerRegistration.team',
        'playerRegistration.category',
        'playerRegistration.tournament',
        'match',
      ],
    });

    if (!participation) {
      throw new NotFoundException('Participación no encontrada');
    }

    return participation;
  }

  async update(id: number, dto: UpdateParticipationDto) {
    await this.findOne(id);

    const updateData: Partial<Participation> = {};

    Object.assign(updateData, dto);

    if (dto.playerRegistrationId !== undefined) {
      updateData.playerRegistration = {
        id: dto.playerRegistrationId,
      } as any;
    }

    if (dto.matchId !== undefined) {
      updateData.match = {
        id: dto.matchId,
      } as any;
    }

    await this.participationRepository.update(id, updateData);

    return this.findOne(id);
  }

  async remove(id: number) {
    const participation = await this.findOne(id);

    return this.participationRepository.remove(participation);
  }
}
