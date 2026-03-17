import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InternationalProgramsService } from './international-programs.service';
import { CreateInternationalProgramDto } from './dto/create-international-program.dto';
import { UpdateInternationalProgramDto } from './dto/update-international-program.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiPaginatedResponse } from '../common/decorators/api-paginated-response.decorator';
import { InternationalProgram } from './entities/international-program.entity';

@ApiTags('international-programs')
@Controller('international-programs')
export class InternationalProgramsController {
  constructor(private readonly service: InternationalProgramsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear programa internacional' })
  @ApiResponse({ status: 201, type: InternationalProgram })
  create(@Body() dto: CreateInternationalProgramDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar programas internacionales' })
  @ApiPaginatedResponse(InternationalProgram)
  findAll(@Query() query: PaginationDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener programa internacional por ID' })
  @ApiResponse({ status: 200, type: InternationalProgram })
  findOne(@Param('id') id: number, @Query('lang') lang?: string) {
    return this.service.findOne(id, lang);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar programa internacional' })
  @ApiResponse({ status: 200, type: InternationalProgram })
  update(@Param('id') id: number, @Body() dto: UpdateInternationalProgramDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar programa internacional (soft delete)' })
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
