import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { SliderHeroModule } from './slider-hero/slider-hero.module';
import { SliderImageModule } from './slider-image/slider-image.module';
import { FooterHelpSectionModule } from './footer-help-section/footer-help-section.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'mi_app',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    SliderHeroModule,
    SliderImageModule,
    FooterHelpSectionModule,
  ],
  controllers: [AppController], // 👈 ESTO ES CLAVE
})
export class AppModule {}