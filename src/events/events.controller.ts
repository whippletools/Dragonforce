import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiPaginatedResponse } from '../common/decorators/api-paginated-response.decorator';
import { Event } from './entities/event.entity';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly service: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear evento con pricing, questions y buttons' })
  @ApiResponse({ status: 201, type: Event })
  create(@Body() dto: CreateEventDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar eventos con paginación e idioma' })
  @ApiPaginatedResponse(Event)
  findAll(@Query() query: PaginationDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener evento por ID con relaciones' })
  @ApiResponse({ status: 200, type: Event })
  findOne(@Param('id') id: number, @Query('lang') lang?: string) {
    return this.service.findOne(id, lang);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar evento' })
  @ApiResponse({ status: 200, type: Event })
  update(@Param('id') id: number, @Body() dto: UpdateEventDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar evento (soft delete)' })
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
