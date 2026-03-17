import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { SliderHeroModule } from './slider-hero/slider-hero.module';
import { SliderImageModule } from './slider-image/slider-image.module';
import { FooterHelpSectionModule } from './footer-help-section/footer-help-section.module';
import { NewsModule } from './news/news.module';
import { EventsModule } from './events/events.module';
import { SchoolsModule } from './schools/schools.module';
import { QualityCarouselModule } from './quality-carousel/quality-carousel.module';
import { TrainChampionsModule } from './train-champions/train-champions.module';
import { InternationalProgramsModule } from './international-programs/international-programs.module';
import { SeedModule } from './database/seeds/seed.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    SliderHeroModule,
    SliderImageModule,
    FooterHelpSectionModule,
    NewsModule,
    EventsModule,
    SchoolsModule,
    QualityCarouselModule,
    TrainChampionsModule,
    InternationalProgramsModule,
    SeedModule,
    UploadModule,
  ],
  controllers: [AppController], // 👈 ESTO ES CLAVE
})
export class AppModule {}