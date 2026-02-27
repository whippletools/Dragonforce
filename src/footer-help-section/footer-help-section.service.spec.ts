import { Test, TestingModule } from '@nestjs/testing';
import { FooterHelpSectionService } from './footer-help-section.service';

describe('FooterHelpSectionService', () => {
  let service: FooterHelpSectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FooterHelpSectionService],
    }).compile();

    service = module.get<FooterHelpSectionService>(FooterHelpSectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
