import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ParticipationService } from './participation.service';

import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';

@Controller('participations')
export class ParticipationController {
  constructor(private readonly participationService: ParticipationService) {}

  @Post()
  create(@Body() dto: CreateParticipationDto) {
    return this.participationService.create(dto);
  }

  @Get()
  findAll() {
    return this.participationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participationService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateParticipationDto) {
    return this.participationService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participationService.remove(+id);
  }
}
