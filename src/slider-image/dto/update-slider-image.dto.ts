import { PartialType } from '@nestjs/mapped-types';
import { CreateSliderImageDto } from './create-slider-image.dto';

export class UpdateSliderImageDto extends PartialType(CreateSliderImageDto) {}
