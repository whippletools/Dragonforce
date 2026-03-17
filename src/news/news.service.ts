import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';
import { transformLanguageFields, transformLanguageArray } from '../common/helpers/language-transform.helper';

const TRANSLATED_FIELDS = ['title', 'excerpt'];

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly repo: Repository<News>,
  ) {}

  async create(dto: CreateNewsDto): Promise<News> {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async findAll(query: PaginationDto): Promise<PaginatedResult<any>> {
    const { page, limit, lang } = query;
    const [data, total] = await this.repo.findAndCount({
      order: { order: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      data: transformLanguageArray(data, lang, TRANSLATED_FIELDS),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: number, lang?: string): Promise<any> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`News #${id} not found`);
    if (lang) return transformLanguageFields(entity, lang as any, TRANSLATED_FIELDS);
    return entity;
  }

  async update(id: number, dto: UpdateNewsDto): Promise<News> {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repo.softDelete(id);
  }
}
