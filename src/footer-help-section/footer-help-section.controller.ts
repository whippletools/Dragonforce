import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FooterHelpSectionService } from './footer-help-section.service';
import { CreateFooterHelpSectionDto } from './dto/create-footer-help-section.dto';
import { UpdateFooterHelpSectionDto } from './dto/update-footer-help-section.dto';

@Controller('footer-help-section')
export class FooterHelpSectionController {
  constructor(private readonly footerHelpSectionService: FooterHelpSectionService) {}

  @Post()
  create(@Body() createFooterHelpSectionDto: CreateFooterHelpSectionDto) {
    return this.footerHelpSectionService.create(createFooterHelpSectionDto);
  }

  @Get()
  findAll() {
    return this.footerHelpSectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.footerHelpSectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFooterHelpSectionDto: UpdateFooterHelpSectionDto) {
    return this.footerHelpSectionService.update(+id, updateFooterHelpSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.footerHelpSectionService.remove(+id);
  }
}
