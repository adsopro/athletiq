import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  create(dto: CreateTeamDto) {
    const team = this.teamRepository.create({
      name: dto.name,
      club: { id: dto.clubId } as any,
      category: { id: dto.categoryId } as any,
    });

    return this.teamRepository.save(team);
  }

  findAll() {
    return this.teamRepository.find({
      relations: ['club', 'category', 'players'],
    });
  }

  async findOne(id: number) {
    const team = await this.teamRepository.findOne({ where: { id } });
    if (!team) throw new NotFoundException('Equipo no encontrado');
    return team;
  }

  async update(id: number, dto: UpdateTeamDto) {
    await this.findOne(id);
    await this.teamRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const team = await this.findOne(id);
    return this.teamRepository.remove(team);
  }
}
