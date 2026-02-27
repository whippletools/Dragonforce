import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SliderHeroService } from './slider-hero.service';
import { SliderHeroController } from './slider-hero.controller';
import { SliderHero } from './entities/slider-hero.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SliderHero]), // 👈 ESTA LÍNEA ES LA CLAVE
  ],
  controllers: [SliderHeroController],
  providers: [SliderHeroService],
})
export class SliderHeroModule {}