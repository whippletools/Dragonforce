import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateTrainChampionDto {
  @ApiProperty({ example: 'play' })
  @IsString()
  type: string;

  @ApiProperty({ example: 'https://example.com/bg.jpg' })
  @IsString()
  backgroundImage: string;

  @ApiProperty({ example: 'JUEGA COMO NOSOTROS' })
  @IsString()
  title_es: string;

  @ApiProperty({ example: 'PLAY LIKE US' })
  @IsString()
  title_en: string;

  @ApiProperty({ example: 'Preinscríbase aquí...' })
  @IsString()
  description_es: string;

  @ApiProperty({ example: 'Pre-register here...' })
  @IsString()
  description_en: string;

  @ApiProperty({ example: 'PREINSCRIPCIÓN' })
  @IsString()
  buttonText_es: string;

  @ApiProperty({ example: 'PRE-REGISTRATION' })
  @IsString()
  buttonText_en: string;

  @ApiProperty({ example: 'preregistration' })
  @IsString()
  formType: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
