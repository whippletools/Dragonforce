import { PartialType } from '@nestjs/mapped-types';
import { CreateFooterHelpSectionDto } from './create-footer-help-section.dto';

export class UpdateFooterHelpSectionDto extends PartialType(CreateFooterHelpSectionDto) {}
