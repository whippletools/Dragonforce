import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiPaginatedResponse } from '../common/decorators/api-paginated-response.decorator';
import { News } from './entities/news.entity';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly service: NewsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear noticia' })
  @ApiResponse({ status: 201, type: News })
  create(@Body() dto: CreateNewsDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar noticias con paginación e idioma' })
  @ApiPaginatedResponse(News)
  findAll(@Query() query: PaginationDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener noticia por ID' })
  @ApiResponse({ status: 200, type: News })
  findOne(@Param('id') id: number, @Query('lang') lang?: string) {
    return this.service.findOne(id, lang);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar noticia' })
  @ApiResponse({ status: 200, type: News })
  update(@Param('id') id: number, @Body() dto: UpdateNewsDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar noticia (soft delete)' })
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
