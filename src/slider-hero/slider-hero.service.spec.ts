import { Test, TestingModule } from '@nestjs/testing';
import { SliderHeroService } from './slider-hero.service';

describe('SliderHeroService', () => {
  let service: SliderHeroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SliderHeroService],
    }).compile();

    service = module.get<SliderHeroService>(SliderHeroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
