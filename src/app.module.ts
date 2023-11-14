import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsEntity } from "./posts/entities/posts.entity";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

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
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      username: 'postgres',
      password: 'postgres',
      database: 'postgres_db',
      entities: [
        PostsEntity,
      ], // 데이터베이스와 연동될 모델들을 입력하는 공간
      synchronize: true, // 작성한 엔티티와 DB의 싱크를 맞출것인가? (JPA의 ddl-auto 와 유사)
      namingStrategy: new SnakeNamingStrategy(), // 컬럼의 네이밍을 Snake Case로 변환
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
