import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Player } from './player.entity';

import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  create(dto: CreatePlayerDto) {
    const player = this.playerRepository.create({
      fullName: dto.fullName,
      birthDate: new Date(dto.birthDate),

      documentNumber: dto.documentNumber,

      internalCode: dto.internalCode,

      position: dto.position,

      dominantFoot: dto.dominantFoot,

      height: dto.height,

      weight: dto.weight,

      photoUrl: dto.photoUrl,

      phone: dto.phone,

      email: dto.email,

      healthInsurance: dto.healthInsurance,

      medicalNotes: dto.medicalNotes,

      active: dto.active ?? true,
    });

    return this.playerRepository.save(player);
  }

  findAll() {
    return this.playerRepository.find({
      relations: ['registrations'],
    });
  }

  async findOne(id: number) {
    const player = await this.playerRepository.findOne({
      where: { id },
      relations: ['registrations'],
    });

    if (!player) {
      throw new NotFoundException('Jugador no encontrado');
    }

    return player;
  }

  async update(id: number, dto: UpdatePlayerDto) {
    await this.findOne(id);

    await this.playerRepository.update(id, dto);

    return this.findOne(id);
  }

  async remove(id: number) {
    const player = await this.findOne(id);

    return this.playerRepository.remove(player);
  }
}
