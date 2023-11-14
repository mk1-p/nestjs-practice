import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';

/**
 * nest g [package-name] 으로 생성하는 경우
 * 자동으로 imports 등록 됨
 *
 * NestJS는 App Module을 어떻게 인식하는가?
 * main.js 내 NestFactory.create(AppModule); 에서 등록이 되고
 * imports 안에 있는 모듈들이 등록이게 된다.
 * main.js(NestFactory AppModule) -> AppModule imports -> Each Module
 */
@Module({
  imports: [PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
