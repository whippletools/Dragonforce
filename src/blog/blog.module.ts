import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Blog } from './entities/blog.entity';
import { Category } from '../categories/entities/category.entity';

import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog, Category]), // 🔥 AGREGAR CATEGORY AQUÍ
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}