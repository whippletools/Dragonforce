import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from './entities/event.entity';
import { EventPricing } from './entities/event-pricing.entity';
import { EventQuestion } from './entities/event-question.entity';
import { EventButton } from './entities/event-button.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventPricing, EventQuestion, EventButton])],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
