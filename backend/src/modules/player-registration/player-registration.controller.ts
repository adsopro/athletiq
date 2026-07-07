import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { PlayerRegistrationService } from './player-registration.service';
import { CreatePlayerRegistrationDto } from './dto/create-player-registration.dto';
import { UpdatePlayerRegistrationDto } from './dto/update-player-registration.dto';

@Controller('player-registrations')
export class PlayerRegistrationController {
  constructor(
    private readonly playerRegistrationService: PlayerRegistrationService,
  ) {}

  @Post()
  create(@Body() dto: CreatePlayerRegistrationDto) {
    return this.playerRegistrationService.create(dto);
  }

  @Get()
  findAll() {
    return this.playerRegistrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerRegistrationService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePlayerRegistrationDto) {
    return this.playerRegistrationService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerRegistrationService.remove(+id);
  }
}
