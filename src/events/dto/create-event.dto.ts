import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventPricingDto {
  @ApiProperty({ example: 'Alumno Dragon Force' })
  @IsString()
  category: string;

  @ApiProperty({ example: 149 })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ example: 'Precio especial para estudiantes' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateEventQuestionDto {
  @ApiProperty({ example: '¿Qué edades pueden participar?' })
  @IsString()
  question_es: string;

  @ApiProperty({ example: 'What ages can participate?' })
  @IsString()
  question_en: string;

  @ApiProperty({ example: 'El programa está diseñado para niños...' })
  @IsString()
  answer_es: string;

  @ApiProperty({ example: 'The program is designed for children...' })
  @IsString()
  answer_en: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

export class CreateEventButtonDto {
  @ApiProperty({ example: 'Inscribirse Ahora' })
  @IsString()
  text: string;

  @ApiProperty({ example: '/register/super-camp-pascua' })
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

export class CreateEventDto {
  @ApiProperty({ example: 'https://dragonforce.fcporto.pt/image.png' })
  @IsString()
  image: string;

  @ApiProperty({ example: 'Super Camp Pascua' })
  @IsString()
  title_es: string;

  @ApiProperty({ example: 'Easter Super Camp' })
  @IsString()
  title_en: string;

  @ApiProperty({ example: 'Programa intensivo de entrenamiento...' })
  @IsString()
  description_es: string;

  @ApiProperty({ example: 'Intensive training program...' })
  @IsString()
  description_en: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @ApiProperty({ type: [CreateEventPricingDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEventPricingDto)
  pricing: CreateEventPricingDto[];

  @ApiProperty({ type: [CreateEventQuestionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEventQuestionDto)
  questions: CreateEventQuestionDto[];

  @ApiProperty({ type: [CreateEventButtonDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEventButtonDto)
  buttons: CreateEventButtonDto[];
}
