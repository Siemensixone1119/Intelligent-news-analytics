import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { NewsModule } from './news/news.module';
import { NewsCollectorModule } from './news-collector/news-collector.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    NewsModule,
    NewsCollectorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
