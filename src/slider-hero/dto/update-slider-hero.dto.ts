import { PartialType } from '@nestjs/mapped-types';
import { CreateSliderHeroDto } from './create-slider-hero.dto';

export class UpdateSliderHeroDto extends PartialType(CreateSliderHeroDto) {}
