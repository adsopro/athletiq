import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tournament } from './tournament.entity';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly repository: Repository<Tournament>,
  ) {}

  create(dto: CreateTournamentDto) {
    const tournament = this.repository.create(dto);

    return this.repository.save(tournament);
  }

  findAll() {
    return this.repository.find({
      relations: ['matches', 'registrations', 'phases'],
    });
  }

  async findOne(id: number) {
    const tournament = await this.repository.findOne({
      where: { id },
      relations: ['matches', 'registrations', 'phases'],
    });

    if (!tournament) throw new NotFoundException('Tournament not found');

    return tournament;
  }

  async update(id: number, dto: UpdateTournamentDto) {
    const tournament = await this.findOne(id);

    Object.assign(tournament, dto);

    return this.repository.save(tournament);
  }

  async remove(id: number) {
    const tournament = await this.findOne(id);

    return this.repository.remove(tournament);
  }
}
