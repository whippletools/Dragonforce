import { Test, TestingModule } from '@nestjs/testing';
import { SliderHeroController } from './slider-hero.controller';
import { SliderHeroService } from './slider-hero.service';

describe('SliderHeroController', () => {
  let controller: SliderHeroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SliderHeroController],
      providers: [SliderHeroService],
    }).compile();

    controller = module.get<SliderHeroController>(SliderHeroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
