import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';
import { Language } from '../common/enums/language.enum';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly repo: Repository<Event>,
  ) {}

  async create(dto: CreateEventDto): Promise<Event> {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async findAll(query: PaginationDto): Promise<PaginatedResult<any>> {
    const { page, limit, lang, raw } = query;
    const [data, total] = await this.repo.findAndCount({
      order: { order: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['pricing', 'questions', 'buttons'],
    });
    return {
      data: raw === 'true' ? data : data.map((event) => this.transformEvent(event, lang)),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: number, lang?: string): Promise<any> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['pricing', 'questions', 'buttons'],
    });
    if (!entity) throw new NotFoundException(`Event #${id} not found`);
    if (lang) return this.transformEvent(entity, lang as Language);
    return entity;
  }

  async update(id: number, dto: UpdateEventDto): Promise<any> {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException(`Event #${id} not found`);
    Object.assign(existing, dto);
    return this.repo.save(existing);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repo.softDelete(id);
  }

  private transformEvent(event: Event, lang: Language): any {
    const { title_es, title_en, description_es, description_en, questions, ...rest } = event;
    return {
      ...rest,
      title: lang === Language.EN ? title_en : title_es,
      description: lang === Language.EN ? description_en : description_es,
      questions: questions?.map((q) => ({
        id: q.id,
        question: lang === Language.EN ? q.question_en : q.question_es,
        answer: lang === Language.EN ? q.answer_en : q.answer_es,
        order: q.order,
      })),
    };
  }
}
