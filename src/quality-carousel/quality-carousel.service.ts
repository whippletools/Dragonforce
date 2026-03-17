import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QualityImage } from './entities/quality-image.entity';
import { CreateQualityImageDto } from './dto/create-quality-image.dto';
import { UpdateQualityImageDto } from './dto/update-quality-image.dto';
import { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';

@Injectable()
export class QualityCarouselService {
  constructor(
    @InjectRepository(QualityImage)
    private readonly repo: Repository<QualityImage>,
  ) {}

  async create(dto: CreateQualityImageDto): Promise<QualityImage> {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async findAll(query: PaginationDto): Promise<PaginatedResult<QualityImage>> {
    const { page, limit } = query;
    const [data, total] = await this.repo.findAndCount({
      order: { order: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: number): Promise<QualityImage> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`QualityImage #${id} not found`);
    return entity;
  }

  async update(id: number, dto: UpdateQualityImageDto): Promise<QualityImage> {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repo.softDelete(id);
  }
}
