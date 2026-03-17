import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SliderHeroService } from './slider-hero.service';
import { CreateSliderHeroDto } from './dto/create-slider-hero.dto';
import { UpdateSliderHeroDto } from './dto/update-slider-hero.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiPaginatedResponse } from '../common/decorators/api-paginated-response.decorator';
import { SliderHero } from './entities/slider-hero.entity';

@ApiTags('hero-slider')
@Controller('hero-slider')
export class SliderHeroController {
  constructor(private readonly service: SliderHeroService) {}

  @Post()
  @ApiOperation({ summary: 'Crear slide del hero' })
  @ApiResponse({ status: 201, type: SliderHero })
  create(@Body() dto: CreateSliderHeroDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar slides del hero' })
  @ApiPaginatedResponse(SliderHero)
  findAll(@Query() query: PaginationDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener slide por ID' })
  @ApiResponse({ status: 200, type: SliderHero })
  findOne(@Param('id') id: number, @Query('lang') lang?: string) {
    return this.service.findOne(id, lang);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar slide' })
  @ApiResponse({ status: 200, type: SliderHero })
  update(@Param('id') id: number, @Body() dto: UpdateSliderHeroDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar slide (soft delete)' })
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
