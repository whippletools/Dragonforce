import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TrainChampionsService } from './train-champions.service';
import { CreateTrainChampionDto } from './dto/create-train-champion.dto';
import { UpdateTrainChampionDto } from './dto/update-train-champion.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiPaginatedResponse } from '../common/decorators/api-paginated-response.decorator';
import { TrainChampion } from './entities/train-champion.entity';

@ApiTags('train-champions')
@Controller('train-champions')
export class TrainChampionsController {
  constructor(private readonly service: TrainChampionsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear opción de entrenamiento' })
  @ApiResponse({ status: 201, type: TrainChampion })
  create(@Body() dto: CreateTrainChampionDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar opciones de entrenamiento' })
  @ApiPaginatedResponse(TrainChampion)
  findAll(@Query() query: PaginationDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener opción de entrenamiento por ID' })
  @ApiResponse({ status: 200, type: TrainChampion })
  findOne(@Param('id') id: number, @Query('lang') lang?: string) {
    return this.service.findOne(id, lang);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar opción de entrenamiento' })
  @ApiResponse({ status: 200, type: TrainChampion })
  update(@Param('id') id: number, @Body() dto: UpdateTrainChampionDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar opción de entrenamiento (soft delete)' })
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
