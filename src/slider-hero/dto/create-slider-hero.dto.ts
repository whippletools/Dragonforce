import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateSliderHeroDto {
  @ApiProperty({ example: 'video' })
  @IsString()
  mediaType: string;

  @ApiProperty({ example: 'https://youtu.be/L3374C3OyrY' })
  @IsString()
  mediaUrl: string;

  @ApiPropertyOptional({ example: 'center' })
  @IsOptional()
  @IsString()
  positionHorizontal?: string;

  @ApiPropertyOptional({ example: 'center' })
  @IsOptional()
  @IsString()
  positionVertical?: string;

  @ApiProperty({ example: 'EVENTOS' })
  @IsString()
  title_es: string;

  @ApiProperty({ example: 'EVENTS' })
  @IsString()
  title_en: string;

  @ApiProperty({ example: 'Entra en un universo donde la Alegría...' })
  @IsString()
  body_es: string;

  @ApiProperty({ example: 'Enter a universe where Joy trains...' })
  @IsString()
  body_en: string;

  @ApiProperty({ example: 'VER CATÁLOGO 25/26' })
  @IsString()
  buttonText_es: string;

  @ApiProperty({ example: 'VIEW CATALOG 25/26' })
  @IsString()
  buttonText_en: string;

  @ApiProperty({ example: '/catalog' })
  @IsString()
  buttonAction: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
