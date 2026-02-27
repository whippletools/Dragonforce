import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SliderImageService } from './slider-image.service';
import { SliderImageController } from './slider-image.controller';
import { SliderImage } from './entities/slider-image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SliderImage]), // 👈 ESTO ES LO QUE FALTA
  ],
  controllers: [SliderImageController],
  providers: [SliderImageService],
})
export class SliderImageModule {}