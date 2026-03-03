import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Blog } from './entities/blog.entity';
import { Category } from '../categories/entities/category.entity';

import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {

  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // 🔥 CREATE
  async create(createBlogDto: CreateBlogDto) {

    const { category_id, ...rest } = createBlogDto;

    const category = await this.categoryRepository.findOne({
      where: { id: category_id },
    });

    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    const blog = this.blogRepository.create({
      ...rest,
      category,
    });

    return await this.blogRepository.save(blog);
  }

  // 🔥 GET ALL
  async findAll() {
    return await this.blogRepository.find({
      relations: ['category'],
    });
  }

  // 🔥 GET ONE
  async findOne(id: number) {
    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!blog) {
      throw new NotFoundException('Blog no encontrado');
    }

    return blog;
  }

  // 🔥 UPDATE
  async update(id: number, updateBlogDto: UpdateBlogDto) {

    const blog = await this.findOne(id);

    const { category_id, ...rest } = updateBlogDto;

    if (category_id) {
      const category = await this.categoryRepository.findOne({
        where: { id: category_id },
      });

      if (!category) {
        throw new NotFoundException('Categoría no encontrada');
      }

      blog.category = category;
    }

    Object.assign(blog, rest);

    return await this.blogRepository.save(blog);
  }

  async remove(id: number) {

  const blog = await this.findOne(id);

  await this.blogRepository.softRemove(blog);

  return { message: 'Blog eliminado correctamente' };
    }
}