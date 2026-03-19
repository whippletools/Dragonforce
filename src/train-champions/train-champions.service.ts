import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainChampion } from './entities/train-champion.entity';
import { CreateTrainChampionDto } from './dto/create-train-champion.dto';
import { UpdateTrainChampionDto } from './dto/update-train-champion.dto';
import { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';
import { transformLanguageFields, transformLanguageArray } from '../common/helpers/language-transform.helper';

const TRANSLATED_FIELDS = ['title', 'description', 'buttonText'];

@Injectable()
export class TrainChampionsService {
  constructor(
    @InjectRepository(TrainChampion)
    private readonly repo: Repository<TrainChampion>,
  ) {}

  async create(dto: CreateTrainChampionDto): Promise<TrainChampion> {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async findAll(query: PaginationDto): Promise<PaginatedResult<any>> {
    const { page, limit, lang, raw } = query;
    const [data, total] = await this.repo.findAndCount({
      order: { order: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      data: raw === 'true' ? data : transformLanguageArray(data, lang, TRANSLATED_FIELDS),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: number, lang?: string): Promise<any> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`TrainChampion #${id} not found`);
    if (lang) return transformLanguageFields(entity, lang as any, TRANSLATED_FIELDS);
    return entity;
  }

  async update(id: number, dto: UpdateTrainChampionDto): Promise<any> {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repo.softDelete(id);
  }
}
