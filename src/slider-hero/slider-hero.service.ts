import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SliderHero } from './entities/slider-hero.entity';
import { CreateSliderHeroDto } from './dto/create-slider-hero.dto';
import { UpdateSliderHeroDto } from './dto/update-slider-hero.dto';
import { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';
import { Language } from '../common/enums/language.enum';

const TRANSLATED_FIELDS = ['title', 'body', 'buttonText'];

@Injectable()
export class SliderHeroService {
  constructor(
    @InjectRepository(SliderHero)
    private readonly repo: Repository<SliderHero>,
  ) { }

  async create(dto: CreateSliderHeroDto): Promise<SliderHero> {
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
      data: raw === 'true' ? data : data.map((slide) => this.transformSlide(slide, lang)),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: number, lang?: string): Promise<any> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`SliderHero #${id} not found`);
    if (lang) return this.transformSlide(entity, lang as Language);
    return entity;
  }

  async update(id: number, dto: UpdateSliderHeroDto): Promise<any> {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repo.softDelete(id);
  }

  private transformSlide(slide: SliderHero, lang: Language): any {
    const {
      title_es, title_en, body_es, body_en,
      buttonText_es, buttonText_en, positionHorizontal, positionVertical,
      ...rest
    } = slide;
    return {
      ...rest,
      position: { horizontal: positionHorizontal, vertical: positionVertical },
      content: {
        title: lang === Language.EN ? title_en : title_es,
        body: lang === Language.EN ? body_en : body_es,
        buttonText: lang === Language.EN ? buttonText_en : buttonText_es,
        buttonAction: slide.buttonAction,
      },
    };
  }
}