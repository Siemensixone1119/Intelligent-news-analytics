import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { NewsRepository } from './news.repository';

@Module({
  providers: [NewsService, NewsRepository],
  controllers: [NewsController],
  imports: [PrismaModule],
  exports: [NewsRepository],
})
export class NewsModule {}
