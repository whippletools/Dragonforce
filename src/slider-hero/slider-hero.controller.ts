import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SliderHeroService } from './slider-hero.service';
import { CreateSliderHeroDto } from './dto/create-slider-hero.dto';
import { UpdateSliderHeroDto } from './dto/update-slider-hero.dto';

@Controller('slider-hero')
export class SliderHeroController {
  constructor(private readonly sliderHeroService: SliderHeroService) {}

  @Post()
  create(@Body() createSliderHeroDto: CreateSliderHeroDto) {
    return this.sliderHeroService.create(createSliderHeroDto);
  }

  @Get()
  findAll() {
    return this.sliderHeroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sliderHeroService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSliderHeroDto: UpdateSliderHeroDto) {
    return this.sliderHeroService.update(+id, updateSliderHeroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sliderHeroService.remove(+id);
  }
}
