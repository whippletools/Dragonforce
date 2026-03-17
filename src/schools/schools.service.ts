import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './entities/school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';
import { transformLanguageFields, transformLanguageArray } from '../common/helpers/language-transform.helper';

const TRANSLATED_FIELDS = ['name'];

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private readonly repo: Repository<School>,
  ) {}

  async create(dto: CreateSchoolDto): Promise<School> {
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
    if (!entity) throw new NotFoundException(`School #${id} not found`);
    if (lang) return transformLanguageFields(entity, lang as any, TRANSLATED_FIELDS);
    return entity;
  }

  async update(id: number, dto: UpdateSchoolDto): Promise<any> {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repo.softDelete(id);
  }
}
