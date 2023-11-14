import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

/**
 * 관리 클래스를 입력하여 자동으로 의존성 주입하게끔 한다.
 * controller : 컨트롤러 클래스에 정의된 API를 NestJS가 열어주도록 함
 * provider: 주입하고자 하는 클래스를 등록
 */
@Module({
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
