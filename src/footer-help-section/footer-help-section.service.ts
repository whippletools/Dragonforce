import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { FooterHelpSection } from './entities/footer-help-section.entity';

@Injectable()
export class FooterHelpSectionService {
  constructor(
    @InjectRepository(FooterHelpSection)
    private readonly repository: Repository<FooterHelpSection>,
  ) { }

  async create(data: Partial<FooterHelpSection>) {
    const item = this.repository.create(data);
    return this.repository.save(item);
  }

  findAll() {
    return this.repository.find();
  }

  // 🔥 NUEVO MÉTODO FORMATEADO
  async findAllFormatted() {
    const data = await this.repository.find({
      where: {
        is_active: true,
        delete_at: IsNull(), // importante para soft delete
      },
      order: {
        id: 'ASC',
      },
    });

    return {
      help: data.map(item => ({
        title: item.title,
        url: item.url,
      })),

      contact: {
        email: "dragonforce@fcporto.pt",
        phone: "+351 962 029 030",
        schedule: "Monterrey Nuevo Leon, México"
      },

      social_media: [
        {
          name: "Facebook",
          icon: "facebook",
          url: "https://facebook.com/fcporto",
        },
        {
          name: "Instagram",
          icon: "instagram",
          url: "https://instagram.com/fcporto",
        },
      ],
    };
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