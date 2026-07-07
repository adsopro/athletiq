import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { TournamentPhaseService } from './tournament-phase.service';
import { CreateTournamentPhaseDto } from './dto/create-tournament-phase.dto';
import { UpdateTournamentPhaseDto } from './dto/update-tournament-phase.dto';

@Controller('tournament-phases')
export class TournamentPhaseController {
  constructor(
    private readonly tournamentPhaseService: TournamentPhaseService,
  ) {}

  @Post()
  create(@Body() dto: CreateTournamentPhaseDto) {
    return this.tournamentPhaseService.create(dto);
  }

  @Get()
  findAll() {
    return this.tournamentPhaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentPhaseService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTournamentPhaseDto) {
    return this.tournamentPhaseService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tournamentPhaseService.remove(+id);
  }
}
