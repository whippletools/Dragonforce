import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';

import { SliderHero } from '../../slider-hero/entities/slider-hero.entity';
import { News } from '../../news/entities/news.entity';
import { School } from '../../schools/entities/school.entity';
import { QualityImage } from '../../quality-carousel/entities/quality-image.entity';
import { TrainChampion } from '../../train-champions/entities/train-champion.entity';
import { Event } from '../../events/entities/event.entity';
import { EventPricing } from '../../events/entities/event-pricing.entity';
import { EventQuestion } from '../../events/entities/event-question.entity';
import { EventButton } from '../../events/entities/event-button.entity';
import { InternationalProgram } from '../../international-programs/entities/international-program.entity';
import { ProgramGalleryImage } from '../../international-programs/entities/program-gallery-image.entity';
import { ProgramButton } from '../../international-programs/entities/program-button.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SliderHero,
      News,
      School,
      QualityImage,
      TrainChampion,
      Event,
      EventPricing,
      EventQuestion,
      EventButton,
      InternationalProgram,
      ProgramGalleryImage,
      ProgramButton,
    ]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
