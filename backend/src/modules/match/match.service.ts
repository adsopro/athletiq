import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Match } from './match.entity';

import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
  ) {}

  async create(dto: CreateMatchDto) {
    const match = this.matchRepository.create({
      opponent: dto.opponent,
      matchDate: new Date(dto.matchDate),

      roundNumber: dto.roundNumber,
      roundName: dto.roundName,

      home: dto.home ?? false,

      goalsFor: dto.goalsFor ?? 0,
      goalsAgainst: dto.goalsAgainst ?? 0,

      venue: dto.venue,
      city: dto.city,

      official: dto.official ?? true,

      status: dto.status ?? 'Scheduled',

      importedAutomatically: dto.importedAutomatically ?? false,

      officialUrl: dto.officialUrl,

      notes: dto.notes,

      team: {
        id: dto.teamId,
      } as any,

      tournament: {
        id: dto.tournamentId,
      } as any,

      phase: {
        id: dto.phaseId,
      } as any,

      group: dto.groupId
        ? ({
            id: dto.groupId,
          } as any)
        : undefined,
    });

    return this.matchRepository.save(match);
  }

  findAll() {
    return this.matchRepository.find({
      relations: ['team', 'tournament', 'phase', 'group', 'participations'],
    });
  }

  async findOne(id: number) {
    const match = await this.matchRepository.findOne({
      where: { id },
      relations: ['team', 'tournament', 'phase', 'group', 'participations'],
    });

    if (!match) {
      throw new NotFoundException('Partido no encontrado');
    }

    return match;
  }

  async update(id: number, dto: UpdateMatchDto) {
    await this.findOne(id);

    const updateData: Partial<Match> = {};

    if (dto.opponent !== undefined) updateData.opponent = dto.opponent;

    if (dto.matchDate !== undefined)
      updateData.matchDate = new Date(dto.matchDate);

    if (dto.roundNumber !== undefined) updateData.roundNumber = dto.roundNumber;

    if (dto.roundName !== undefined) updateData.roundName = dto.roundName;

    if (dto.home !== undefined) updateData.home = dto.home;

    if (dto.goalsFor !== undefined) updateData.goalsFor = dto.goalsFor;

    if (dto.goalsAgainst !== undefined)
      updateData.goalsAgainst = dto.goalsAgainst;

    if (dto.venue !== undefined) updateData.venue = dto.venue;

    if (dto.city !== undefined) updateData.city = dto.city;

    if (dto.official !== undefined) updateData.official = dto.official;

    if (dto.status !== undefined) updateData.status = dto.status;

    if (dto.importedAutomatically !== undefined)
      updateData.importedAutomatically = dto.importedAutomatically;

    if (dto.officialUrl !== undefined) updateData.officialUrl = dto.officialUrl;

    if (dto.notes !== undefined) updateData.notes = dto.notes;

    if (dto.teamId !== undefined)
      updateData.team = {
        id: dto.teamId,
      } as any;

    if (dto.tournamentId !== undefined)
      updateData.tournament = {
        id: dto.tournamentId,
      } as any;

    if (dto.phaseId !== undefined)
      updateData.phase = {
        id: dto.phaseId,
      } as any;

    if (dto.groupId !== undefined) {
      updateData.group = dto.groupId
        ? ({
            id: dto.groupId,
          } as any)
        : null;
    }

    await this.matchRepository.update(id, updateData);

    return this.findOne(id);
  }

  async remove(id: number) {
    const match = await this.findOne(id);

    return this.matchRepository.remove(match);
  }
}
