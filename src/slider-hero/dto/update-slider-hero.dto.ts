import { PartialType } from '@nestjs/swagger';
import { CreateSliderHeroDto } from './create-slider-hero.dto';

export class UpdateSliderHeroDto extends PartialType(CreateSliderHeroDto) {}
