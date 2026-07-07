import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './club.entity';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private readonly clubRepository: Repository<Club>,
  ) {}

  create(dto: CreateClubDto) {
    const club = this.clubRepository.create(dto);
    return this.clubRepository.save(club);
  }

  findAll() {
    return this.clubRepository.find({ relations: ['categories', 'teams'] });
  }

  async findOne(id: number) {
    const club = await this.clubRepository.findOne({ where: { id } });
    if (!club) throw new NotFoundException('Club no encontrado');
    return club;
  }

  async update(id: number, dto: UpdateClubDto) {
    await this.findOne(id);
    await this.clubRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const club = await this.findOne(id);
    return this.clubRepository.remove(club);
  }
}
