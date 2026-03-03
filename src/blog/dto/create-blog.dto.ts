import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateBlogDto {

  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsOptional()
  @IsString()
  image_featured: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsNumber()
  category_id: number;
}