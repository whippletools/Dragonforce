import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FooterHelpSection } from './entities/footer-help-section.entity';

@Injectable()
export class FooterHelpSectionService {
  constructor(
    @InjectRepository(FooterHelpSection)
    private readonly repository: Repository<FooterHelpSection>,
  ) {}

  async create(data: Partial<FooterHelpSection>) {
    const item = this.repository.create(data);
    return this.repository.save(item);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const item = await this.repository.findOne({ where: { id } });

    if (!item) {
      throw new NotFoundException('FooterHelpSection not found');
    }

    return item;
  }

  async update(id: number, data: Partial<FooterHelpSection>) {
    await this.repository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.repository.softDelete(id);
  }
}