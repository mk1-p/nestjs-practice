import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsModel } from "./entities/posts.entity";

/**
 * 관리 클래스를 입력하여 자동으로 의존성 주입하게끔 한다.
 * controller : 컨트롤러 클래스에 정의된 API를 NestJS가 열어주도록 함
 * provider: 주입하고자 하는 클래스를 등록
 */
@Module({
  imports:[
    TypeOrmModule.forFeature(
      [
        PostsModel,
      ]
    ), // TypeOrm 에서 사용할 Repository 를 다를수있게 해주는 기능
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
