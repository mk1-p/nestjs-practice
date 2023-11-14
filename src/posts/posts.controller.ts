import { Body, Controller, Delete, Get, Header, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { PostsService } from './posts.service';
import { PostModelDto } from './post-model.dto';
import { Builder } from 'builder-pattern';

let posts: PostModelDto[];
posts = [
  // builder-pattern 적용 해보기
  Builder(PostModelDto)
    .id(1)
    .author("newjeans_official")
    .title("뉴진스 민지")
    .content("메이크업 고치고 있는 민지")
    .likeCount(1000)
    .commentCount(999999)
    .build(),
  Builder(PostModelDto)
    .id(2)
    .author("newjeans_official")
    .title("뉴진스 혜린")
    .content("노래 연습하고 있는 혜린")
    .likeCount(1000)
    .commentCount(999999)
    .build(),
  Builder(PostModelDto)
    .id(3)
    .author("blackpink_official")
    .title("블랙핑크 로제")
    .content("공연 연습하고 있는 로제")
    .likeCount(1000)
    .commentCount(999999)
    .build(),
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPost(@Param('id') id: number): PostModelDto {
    return this.postsService.getPostById(id);
  }

  @Post()
  @Header('content-type', 'application/json; charset=utf-8')
  createPost(@Body() post: PostModelDto) {
    return this.postsService.createPost(post);
  }

  @Put(':id')
  @Header('content-type', 'application/json; charset=utf-8')
  updatePost(@Param('id') id: number, @Body() post: PostModelDto) {
    return this.postsService.updatePost(id, post);
  }

  @Delete(':id')
  deletePost(@Param('id') id: number) {
    this.postsService.deletePost(id);
  }
}
