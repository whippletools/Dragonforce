import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SliderImageService } from './slider-image.service';
import { CreateSliderImageDto } from './dto/create-slider-image.dto';
import { UpdateSliderImageDto } from './dto/update-slider-image.dto';

@Controller('slider-image')
export class SliderImageController {
  constructor(private readonly sliderImageService: SliderImageService) {}

  @Post()
  create(@Body() createSliderImageDto: CreateSliderImageDto) {
    return this.sliderImageService.create(createSliderImageDto);
  }

  @Get()
  findAll() {
    return this.sliderImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sliderImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSliderImageDto: UpdateSliderImageDto) {
    return this.sliderImageService.update(+id, updateSliderImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sliderImageService.remove(+id);
  }
}
