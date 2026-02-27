import { Test, TestingModule } from '@nestjs/testing';
import { FooterHelpSectionController } from './footer-help-section.controller';
import { FooterHelpSectionService } from './footer-help-section.service';

describe('FooterHelpSectionController', () => {
  let controller: FooterHelpSectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FooterHelpSectionController],
      providers: [FooterHelpSectionService],
    }).compile();

    controller = module.get<FooterHelpSectionController>(FooterHelpSectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
