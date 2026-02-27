import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SliderHero } from './entities/slider-hero.entity';

@Injectable()
export class SliderHeroService {
  constructor(
    @InjectRepository(SliderHero)
    private readonly sliderHeroRepository: Repository<SliderHero>,
  ) {}

  create(data: Partial<SliderHero>) {
    return this.sliderHeroRepository.save(data);
  }

  findAll() {
    return this.sliderHeroRepository.find();
  }

  findOne(id: number) {
    return this.sliderHeroRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<SliderHero>) {
  const hero = await this.sliderHeroRepository.findOne({
    where: { id },
  });

  if (!hero) {
    throw new Error('Hero not found');
  }

  Object.assign(hero, data);

  // Generamos fecha válida en el servidor
  hero.update_at = new Date();

  return this.sliderHeroRepository.save(hero);
}
  remove(id: number) {
    return this.sliderHeroRepository.delete(id);
  }
}