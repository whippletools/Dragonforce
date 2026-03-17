import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainChampionsService } from './train-champions.service';
import { TrainChampionsController } from './train-champions.controller';
import { TrainChampion } from './entities/train-champion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrainChampion])],
  controllers: [TrainChampionsController],
  providers: [TrainChampionsService],
  exports: [TrainChampionsService],
})
export class TrainChampionsModule {}
