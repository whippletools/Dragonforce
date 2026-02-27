import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SliderImage } from './entities/slider-image.entity';

@Injectable()
export class SliderImageService {
  constructor(
    @InjectRepository(SliderImage)
    private readonly sliderImageRepository: Repository<SliderImage>,
  ) {}

  // Crear
  async create(data: Partial<SliderImage>) {
    const image = this.sliderImageRepository.create(data);
    return await this.sliderImageRepository.save(image);
  }

  // Obtener todos
  findAll() {
    return this.sliderImageRepository.find();
  }

  // Obtener uno
  async findOne(id: number) {
    const image = await this.sliderImageRepository.findOne({ where: { id } });

    if (!image) {
      throw new NotFoundException('SliderImage not found');
    }

    return image;
  }

  // Actualizar
  async update(id: number, data: Partial<SliderImage>) {
    await this.sliderImageRepository.update(id, data);
    return this.findOne(id);
  }

  // Eliminar (soft delete)
  async remove(id: number) {
    return this.sliderImageRepository.softDelete(id);
  }
}