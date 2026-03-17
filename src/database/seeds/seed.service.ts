import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';

import { SliderHero } from '../../slider-hero/entities/slider-hero.entity';
import { News } from '../../news/entities/news.entity';
import { School } from '../../schools/entities/school.entity';
import { QualityImage } from '../../quality-carousel/entities/quality-image.entity';
import { TrainChampion } from '../../train-champions/entities/train-champion.entity';
import { Event } from '../../events/entities/event.entity';
import { EventPricing } from '../../events/entities/event-pricing.entity';
import { EventQuestion } from '../../events/entities/event-question.entity';
import { EventButton } from '../../events/entities/event-button.entity';
import { InternationalProgram } from '../../international-programs/entities/international-program.entity';
import { ProgramGalleryImage } from '../../international-programs/entities/program-gallery-image.entity';
import { ProgramButton } from '../../international-programs/entities/program-button.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);
  private readonly dataPath: string;

  constructor(
    @InjectRepository(SliderHero) private readonly heroRepo: Repository<SliderHero>,
    @InjectRepository(News) private readonly newsRepo: Repository<News>,
    @InjectRepository(School) private readonly schoolRepo: Repository<School>,
    @InjectRepository(QualityImage) private readonly qualityRepo: Repository<QualityImage>,
    @InjectRepository(TrainChampion) private readonly trainRepo: Repository<TrainChampion>,
    @InjectRepository(Event) private readonly eventRepo: Repository<Event>,
    @InjectRepository(EventPricing) private readonly pricingRepo: Repository<EventPricing>,
    @InjectRepository(EventQuestion) private readonly questionRepo: Repository<EventQuestion>,
    @InjectRepository(EventButton) private readonly eventButtonRepo: Repository<EventButton>,
    @InjectRepository(InternationalProgram) private readonly programRepo: Repository<InternationalProgram>,
    @InjectRepository(ProgramGalleryImage) private readonly galleryRepo: Repository<ProgramGalleryImage>,
    @InjectRepository(ProgramButton) private readonly programButtonRepo: Repository<ProgramButton>,
  ) {
    this.dataPath = path.resolve(__dirname, '../../../../Dragonforce/src/data');
  }

  async onModuleInit() {
    this.logger.log('Checking if seed is needed...');
    await this.seed();
  }

  private readJson(filename: string): any {
    const filePath = path.join(this.dataPath, filename);
    if (!fs.existsSync(filePath)) {
      this.logger.warn(`Seed file not found: ${filePath}`);
      return null;
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  async seed() {
    await this.seedHeroSlider();
    await this.seedNews();
    await this.seedSchools();
    await this.seedQualityCarousel();
    await this.seedTrainChampions();
    await this.seedEvents();
    await this.seedInternationalPrograms();
    this.logger.log('Seed completed successfully');
  }

  private async seedHeroSlider() {
    const count = await this.heroRepo.count();
    if (count > 0) {
      this.logger.log('HeroSlider already seeded, skipping...');
      return;
    }
    const data = this.readJson('heroSlider.json');
    if (!data) return;

    for (const slide of data.slides) {
      await this.heroRepo.save(
        this.heroRepo.create({
          mediaType: slide.mediaType,
          mediaUrl: slide.mediaUrl,
          positionHorizontal: slide.position.horizontal,
          positionVertical: slide.position.vertical,
          title_es: slide.content.es.title,
          title_en: slide.content.en.title,
          body_es: slide.content.es.body,
          body_en: slide.content.en.body,
          buttonText_es: slide.content.es.buttonText,
          buttonText_en: slide.content.en.buttonText,
          buttonAction: slide.content.es.buttonAction,
          order: slide.id,
        }),
      );
    }
    this.logger.log(`Seeded ${data.slides.length} hero slides`);
  }

  private async seedNews() {
    const count = await this.newsRepo.count();
    if (count > 0) {
      this.logger.log('News already seeded, skipping...');
      return;
    }
    const data = this.readJson('news.json');
    if (!data) return;

    for (const article of data.articles) {
      await this.newsRepo.save(
        this.newsRepo.create({
          slug: article.slug,
          image: article.image,
          date: article.date,
          dateSort: article.dateSort,
          title_es: article.title.es,
          title_en: article.title.en,
          excerpt_es: article.excerpt.es,
          excerpt_en: article.excerpt.en,
          order: article.order,
        }),
      );
    }
    this.logger.log(`Seeded ${data.articles.length} news articles`);
  }

  private async seedSchools() {
    const count = await this.schoolRepo.count();
    if (count > 0) {
      this.logger.log('Schools already seeded, skipping...');
      return;
    }
    const data = this.readJson('schools.json');
    if (!data) return;

    for (const school of data.schools) {
      await this.schoolRepo.save(
        this.schoolRepo.create({
          image: school.image,
          name_es: school.name.es,
          name_en: school.name.en,
          location: school.location,
          pdfUrl: school.pdfUrl,
          order: school.order,
        }),
      );
    }
    this.logger.log(`Seeded ${data.schools.length} schools`);
  }

  private async seedQualityCarousel() {
    const count = await this.qualityRepo.count();
    if (count > 0) {
      this.logger.log('QualityCarousel already seeded, skipping...');
      return;
    }
    const data = this.readJson('qualityCarousel.json');
    if (!data) return;

    for (const img of data.images) {
      await this.qualityRepo.save(
        this.qualityRepo.create({
          url: img.url,
          alt: img.alt,
          order: img.order,
        }),
      );
    }
    this.logger.log(`Seeded ${data.images.length} quality images`);
  }

  private async seedTrainChampions() {
    const count = await this.trainRepo.count();
    if (count > 0) {
      this.logger.log('TrainChampions already seeded, skipping...');
      return;
    }
    const data = this.readJson('trainChampions.json');
    if (!data) return;

    for (const option of data.options) {
      await this.trainRepo.save(
        this.trainRepo.create({
          type: option.type,
          backgroundImage: option.backgroundImage,
          title_es: option.title.es,
          title_en: option.title.en,
          description_es: option.description.es,
          description_en: option.description.en,
          buttonText_es: option.buttonText.es,
          buttonText_en: option.buttonText.en,
          formType: option.formType,
          order: option.order,
        }),
      );
    }
    this.logger.log(`Seeded ${data.options.length} train champion options`);
  }

  private async seedEvents() {
    const count = await this.eventRepo.count();
    if (count > 0) {
      this.logger.log('Events already seeded, skipping...');
      return;
    }
    const data = this.readJson('events.json');
    if (!data) return;

    for (const evt of data.events) {
      const event = await this.eventRepo.save(
        this.eventRepo.create({
          image: evt.image,
          title_es: evt.title.es,
          title_en: evt.title.en,
          description_es: evt.description.es,
          description_en: evt.description.en,
          order: evt.order,
        }),
      );

      for (const p of evt.pricing) {
        await this.pricingRepo.save(
          this.pricingRepo.create({
            category: p.category,
            price: p.price,
            description: p.description,
            event,
          }),
        );
      }

      const questionsEs = evt.questions.es || [];
      const questionsEn = evt.questions.en || [];
      for (let i = 0; i < questionsEs.length; i++) {
        await this.questionRepo.save(
          this.questionRepo.create({
            question_es: questionsEs[i].question,
            question_en: questionsEn[i]?.question || '',
            answer_es: questionsEs[i].answer,
            answer_en: questionsEn[i]?.answer || '',
            order: questionsEs[i].id,
            event,
          }),
        );
      }

      for (let i = 0; i < evt.buttons.length; i++) {
        await this.eventButtonRepo.save(
          this.eventButtonRepo.create({
            text: evt.buttons[i].text,
            action: evt.buttons[i].action,
            variant: evt.buttons[i].variant,
            order: i + 1,
            event,
          }),
        );
      }
    }
    this.logger.log(`Seeded ${data.events.length} events with relations`);
  }

  private async seedInternationalPrograms() {
    const count = await this.programRepo.count();
    if (count > 0) {
      this.logger.log('InternationalPrograms already seeded, skipping...');
      return;
    }
    const data = this.readJson('internationalPrograms.json');
    if (!data) return;

    for (const prog of data.programs) {
      const program = await this.programRepo.save(
        this.programRepo.create({
          coverImage: prog.coverImage,
          title_es: prog.title.es,
          title_en: prog.title.en,
          description_es: prog.description.es,
          description_en: prog.description.en,
          order: prog.order,
        }),
      );

      for (let i = 0; i < prog.gallery.length; i++) {
        await this.galleryRepo.save(
          this.galleryRepo.create({
            url: prog.gallery[i],
            order: i + 1,
            program,
          }),
        );
      }

      for (let i = 0; i < prog.buttons.length; i++) {
        await this.programButtonRepo.save(
          this.programButtonRepo.create({
            text: prog.buttons[i].text,
            action: prog.buttons[i].action,
            variant: prog.buttons[i].variant,
            order: i + 1,
            program,
          }),
        );
      }
    }
    this.logger.log(`Seeded ${data.programs.length} international programs with relations`);
  }
}
