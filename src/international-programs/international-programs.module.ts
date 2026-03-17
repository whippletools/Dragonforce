import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternationalProgramsService } from './international-programs.service';
import { InternationalProgramsController } from './international-programs.controller';
import { InternationalProgram } from './entities/international-program.entity';
import { ProgramGalleryImage } from './entities/program-gallery-image.entity';
import { ProgramButton } from './entities/program-button.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InternationalProgram, ProgramGalleryImage, ProgramButton])],
  controllers: [InternationalProgramsController],
  providers: [InternationalProgramsService],
  exports: [InternationalProgramsService],
})
export class InternationalProgramsModule {}
