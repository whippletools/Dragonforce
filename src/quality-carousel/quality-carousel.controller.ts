import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QualityCarouselService } from './quality-carousel.service';
import { CreateQualityImageDto } from './dto/create-quality-image.dto';
import { UpdateQualityImageDto } from './dto/update-quality-image.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiPaginatedResponse } from '../common/decorators/api-paginated-response.decorator';
import { QualityImage } from './entities/quality-image.entity';

@ApiTags('quality-carousel')
@Controller('quality-carousel')
export class QualityCarouselController {
  constructor(private readonly service: QualityCarouselService) {}

  @Post()
  @ApiOperation({ summary: 'Crear imagen del carrusel de calidad' })
  @ApiResponse({ status: 201, type: QualityImage })
  create(@Body() dto: CreateQualityImageDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar imágenes del carrusel de calidad' })
  @ApiPaginatedResponse(QualityImage)
  findAll(@Query() query: PaginationDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener imagen del carrusel por ID' })
  @ApiResponse({ status: 200, type: QualityImage })
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar imagen del carrusel' })
  @ApiResponse({ status: 200, type: QualityImage })
  update(@Param('id') id: number, @Body() dto: UpdateQualityImageDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar imagen del carrusel (soft delete)' })
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
