import { PartialType } from '@nestjs/swagger';
import { CreateTrainChampionDto } from './create-train-champion.dto';

export class UpdateTrainChampionDto extends PartialType(CreateTrainChampionDto) {}
