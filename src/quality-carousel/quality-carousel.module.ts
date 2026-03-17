import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualityCarouselService } from './quality-carousel.service';
import { QualityCarouselController } from './quality-carousel.controller';
import { QualityImage } from './entities/quality-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QualityImage])],
  controllers: [QualityCarouselController],
  providers: [QualityCarouselService],
  exports: [QualityCarouselService],
})
export class QualityCarouselModule {}
