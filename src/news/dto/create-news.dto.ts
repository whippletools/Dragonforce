import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({ example: 'dragon-force-championship-2024' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 'https://images.unsplash.com/photo.jpg' })
  @IsString()
  image: string;

  @ApiProperty({ example: '15 Marzo 2024' })
  @IsString()
  date: string;

  @ApiProperty({ example: '2024-03-15' })
  @IsString()
  dateSort: string;

  @ApiProperty({ example: 'Dragon Force gana el Campeonato Regional 2024' })
  @IsString()
  title_es: string;

  @ApiProperty({ example: 'Dragon Force wins Regional Championship 2024' })
  @IsString()
  title_en: string;

  @ApiProperty({ example: 'Nuestros equipos juveniles han demostrado...' })
  @IsString()
  excerpt_es: string;

  @ApiProperty({ example: 'Our youth teams have shown exceptional...' })
  @IsString()
  excerpt_en: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
