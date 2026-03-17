import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateSchoolDto {
  @ApiProperty({ example: 'https://dragonforce.fcporto.pt/image.png' })
  @IsString()
  image: string;

  @ApiProperty({ example: 'COLEGIO IBÉRICO DE GAIA' })
  @IsString()
  name_es: string;

  @ApiProperty({ example: 'IBERIAN SCHOOL OF GAIA' })
  @IsString()
  name_en: string;

  @ApiProperty({ example: '(GAIA)' })
  @IsString()
  location: string;

  @ApiProperty({ example: '/pdfs/schools/colegio-iberico-gaia.pdf' })
  @IsString()
  pdfUrl: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
