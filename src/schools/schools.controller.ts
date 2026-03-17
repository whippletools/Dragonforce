import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SchoolsService } from './schools.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiPaginatedResponse } from '../common/decorators/api-paginated-response.decorator';
import { School } from './entities/school.entity';

@ApiTags('schools')
@Controller('schools')
export class SchoolsController {
  constructor(private readonly service: SchoolsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear escuela' })
  @ApiResponse({ status: 201, type: School })
  create(@Body() dto: CreateSchoolDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar escuelas con paginación e idioma' })
  @ApiPaginatedResponse(School)
  findAll(@Query() query: PaginationDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener escuela por ID' })
  @ApiResponse({ status: 200, type: School })
  findOne(@Param('id') id: number, @Query('lang') lang?: string) {
    return this.service.findOne(id, lang);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar escuela' })
  @ApiResponse({ status: 200, type: School })
  update(@Param('id') id: number, @Body() dto: UpdateSchoolDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar escuela (soft delete)' })
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
