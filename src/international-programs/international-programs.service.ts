import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InternationalProgram } from './entities/international-program.entity';
import { CreateInternationalProgramDto } from './dto/create-international-program.dto';
import { UpdateInternationalProgramDto } from './dto/update-international-program.dto';
import { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';
import { Language } from '../common/enums/language.enum';

@Injectable()
export class InternationalProgramsService {
  constructor(
    @InjectRepository(InternationalProgram)
    private readonly repo: Repository<InternationalProgram>,
  ) { }

  async create(dto: CreateInternationalProgramDto): Promise<InternationalProgram> {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async findAll(query: PaginationDto): Promise<PaginatedResult<any>> {
    const { page, limit, lang, raw } = query;
    const [data, total] = await this.repo.findAndCount({
      order: { order: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['gallery', 'buttons'],
    });
    return {
      data: raw === 'true' ? data : data.map((p) => this.transformProgram(p, lang)),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: number, lang?: string): Promise<any> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['gallery', 'buttons'],
    });
    if (!entity) throw new NotFoundException(`InternationalProgram #${id} not found`);
    if (lang) return this.transformProgram(entity, lang as Language);
    return entity;
  }

  async update(id: number, dto: UpdateInternationalProgramDto): Promise<any> {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException(`InternationalProgram #${id} not found`);
    Object.assign(existing, dto);
    return this.repo.save(existing);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repo.softDelete(id);
  }

  private transformProgram(program: InternationalProgram, lang: Language): any {
    const { title_es, title_en, description_es, description_en, gallery, ...rest } = program;
    return {
      ...rest,
      title: lang === Language.EN ? title_en : title_es,
      description: lang === Language.EN ? description_en : description_es,
      gallery: gallery?.map((img) => img.url),
    };
  }
}
