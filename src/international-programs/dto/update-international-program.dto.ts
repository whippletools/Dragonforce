import { PartialType } from '@nestjs/swagger';
import { CreateInternationalProgramDto } from './create-international-program.dto';

export class UpdateInternationalProgramDto extends PartialType(CreateInternationalProgramDto) {}
