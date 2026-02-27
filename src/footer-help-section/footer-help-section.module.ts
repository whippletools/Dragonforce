import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 👈 FALTA
import { FooterHelpSection } from './entities/footer-help-section.entity';
import { FooterHelpSectionService } from './footer-help-section.service';
import { FooterHelpSectionController } from './footer-help-section.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FooterHelpSection])],
  controllers: [FooterHelpSectionController],
  providers: [FooterHelpSectionService],
})
export class FooterHelpSectionModule {}