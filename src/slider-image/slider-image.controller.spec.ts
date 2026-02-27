import { Test, TestingModule } from '@nestjs/testing';
import { SliderImageController } from './slider-image.controller';
import { SliderImageService } from './slider-image.service';

describe('SliderImageController', () => {
  let controller: SliderImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SliderImageController],
      providers: [SliderImageService],
    }).compile();

    controller = module.get<SliderImageController>(SliderImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
