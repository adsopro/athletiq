import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PlayerRegistration } from './player-registration.entity';
import { CreatePlayerRegistrationDto } from './dto/create-player-registration.dto';
import { UpdatePlayerRegistrationDto } from './dto/update-player-registration.dto';

@Injectable()
export class PlayerRegistrationService {
  constructor(
    @InjectRepository(PlayerRegistration)
    private readonly registrationRepository: Repository<PlayerRegistration>,
  ) {}

  create(dto: CreatePlayerRegistrationDto) {
    const registration = this.registrationRepository.create({
      player: { id: dto.playerId } as any,
      team: { id: dto.teamId } as any,
      category: { id: dto.categoryId } as any,
      tournament: { id: dto.tournamentId } as any,

      jerseyNumber: dto.jerseyNumber,
      registrationDate: new Date(dto.registrationDate),

      withdrawalDate: dto.withdrawalDate
        ? new Date(dto.withdrawalDate)
        : undefined,

      active: dto.active ?? true,
      isReinforcement: dto.isReinforcement ?? false,
      observations: dto.observations,
    });

    return this.registrationRepository.save(registration);
  }

  findAll() {
    return this.registrationRepository.find({
      relations: ['player', 'team', 'category', 'tournament', 'participations'],
    });
  }

  async findOne(id: number) {
    const registration = await this.registrationRepository.findOne({
      where: { id },
      relations: ['player', 'team', 'category', 'tournament', 'participations'],
    });

    if (!registration) {
      throw new NotFoundException('Inscripción no encontrada');
    }

    return registration;
  }

  async update(id: number, dto: UpdatePlayerRegistrationDto) {
    const registration = await this.findOne(id);

    if (dto.playerId !== undefined) {
      registration.player = { id: dto.playerId } as any;
    }

    if (dto.teamId !== undefined) {
      registration.team = { id: dto.teamId } as any;
    }

    if (dto.categoryId !== undefined) {
      registration.category = { id: dto.categoryId } as any;
    }

    if (dto.tournamentId !== undefined) {
      registration.tournament = { id: dto.tournamentId } as any;
    }

    if (dto.jerseyNumber !== undefined) {
      registration.jerseyNumber = dto.jerseyNumber;
    }

    if (dto.registrationDate !== undefined) {
      registration.registrationDate = new Date(dto.registrationDate);
    }

    if (dto.withdrawalDate !== undefined) {
      registration.withdrawalDate = dto.withdrawalDate
        ? new Date(dto.withdrawalDate)
        : undefined;
    }

    if (dto.active !== undefined) {
      registration.active = dto.active;
    }

    if (dto.isReinforcement !== undefined) {
      registration.isReinforcement = dto.isReinforcement;
    }

    if (dto.observations !== undefined) {
      registration.observations = dto.observations;
    }

    return this.registrationRepository.save(registration);
  }

  async remove(id: number) {
    const registration = await this.findOne(id);
    return this.registrationRepository.remove(registration);
  }
}
