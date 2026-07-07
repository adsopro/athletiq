import { PartialType } from '@nestjs/mapped-types';
import { CreateTournamentPhaseDto } from './create-tournament-phase.dto';

export class UpdateTournamentPhaseDto extends PartialType(
  CreateTournamentPhaseDto,
) {}
