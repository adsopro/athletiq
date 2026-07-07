import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Group } from './group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  create(dto: CreateGroupDto) {
    const group = this.groupRepository.create({
      phase: { id: dto.phaseId } as any,
      code: dto.code,
      name: dto.name,
      orderNumber: dto.orderNumber ?? 1,
      maxTeams: dto.maxTeams ?? 4,
      qualifiedTeams: dto.qualifiedTeams ?? 2,
      active: dto.active ?? true,
    });

    return this.groupRepository.save(group);
  }

  findAll() {
    return this.groupRepository.find({
      relations: ['phase', 'matches'],
    });
  }

  async findOne(id: number) {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['phase', 'matches'],
    });

    if (!group) {
      throw new NotFoundException('Grupo no encontrado');
    }

    return group;
  }

  async update(id: number, dto: UpdateGroupDto) {
    const group = await this.findOne(id);

    if (dto.phaseId !== undefined) {
      group.phase = { id: dto.phaseId } as any;
    }

    if (dto.code !== undefined) {
      group.code = dto.code;
    }

    if (dto.name !== undefined) {
      group.name = dto.name;
    }

    if (dto.orderNumber !== undefined) {
      group.orderNumber = dto.orderNumber;
    }

    if (dto.maxTeams !== undefined) {
      group.maxTeams = dto.maxTeams;
    }

    if (dto.qualifiedTeams !== undefined) {
      group.qualifiedTeams = dto.qualifiedTeams;
    }

    if (dto.active !== undefined) {
      group.active = dto.active;
    }

    return this.groupRepository.save(group);
  }

  async remove(id: number) {
    const group = await this.findOne(id);
    return this.groupRepository.remove(group);
  }
}
