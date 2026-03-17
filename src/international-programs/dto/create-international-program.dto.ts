import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProgramGalleryImageDto {
  @ApiProperty({ example: 'https://dragonforce.fcporto.pt/gallery.jpg' })
  @IsString()
  url: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

export class CreateProgramButtonDto {
  @ApiProperty({ example: 'Inscribirse Ahora' })
  @IsString()
  text: string;

  @ApiProperty({ example: '/register/youth-football-tour' })
  @IsString()
  action: string;

  @ApiProperty({ example: 'primary' })
  @IsString()
  variant: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

export class CreateInternationalProgramDto {
  @ApiProperty({ example: 'https://dragonforce.fcporto.pt/cover.png' })
  @IsString()
  coverImage: string;

  @ApiProperty({ example: 'YOUTH FOOTBALL TOUR' })
  @IsString()
  title_es: string;

  @ApiProperty({ example: 'YOUTH FOOTBALL TOUR' })
  @IsString()
  title_en: string;

  @ApiProperty({ example: 'Experiencia internacional única...' })
  @IsString()
  description_es: string;

  @ApiProperty({ example: 'Unique international experience...' })
  @IsString()
  description_en: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @ApiProperty({ type: [CreateProgramGalleryImageDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProgramGalleryImageDto)
  gallery: CreateProgramGalleryImageDto[];

  @ApiProperty({ type: [CreateProgramButtonDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProgramButtonDto)
  buttons: CreateProgramButtonDto[];
}
