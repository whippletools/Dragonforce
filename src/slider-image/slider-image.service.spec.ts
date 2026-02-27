import { Test, TestingModule } from '@nestjs/testing';
import { SliderImageService } from './slider-image.service';

describe('SliderImageService', () => {
  let service: SliderImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SliderImageService],
    }).compile();

    service = module.get<SliderImageService>(SliderImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
