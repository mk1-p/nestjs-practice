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
    return posts;
  }

  @Get(':id')
  getPost(@Param('id') id: string): PostModelDto {
    const post = posts.find((post) => post.id === +id);
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  @Post()
  @Header('content-type', 'application/json; charset=utf-8')
  createPost(@Body() post: PostModelDto) {
    const id = posts[posts.length - 1].id + 1;
    post.id = id;
    posts = [...posts, post];
    return post;
  }

  @Put(':id')
  @Header('content-type', 'application/json; charset=utf-8')
  updatePost(@Param('id') id: number, @Body() req: PostModelDto) {
    const post = posts.find((post) => post.id === +id);
    if (!post) {
      throw new NotFoundException();
    }
    post.updatePost(req);
    return post;
  }

  @Delete(':id')
  deletePost(@Param('id') id: number) {
    console.log(id);
    posts = posts.filter((post) => post.id !== id);
  }
}
