import { Body, Controller, Delete, Get, Header, Param, Post, Put } from "@nestjs/common";
import { PostsService } from './posts.service';
import { PostsDto } from './posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {} // 의존성 주입 구간

  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPost(@Param('id') id: number) {
    return this.postsService.getPostById(id);
  }

  @Post()
  @Header('content-type', 'application/json; charset=utf-8')
  createPost(@Body() post: PostsDto) {
    return this.postsService.createPost(post);
  }

  @Put(':id')
  @Header('content-type', 'application/json; charset=utf-8')
  updatePost(@Param('id') id: number, @Body() post: PostsDto) {
    return this.postsService.updatePost(id, post);
  }

  @Delete(':id')
  deletePost(@Param('id') id: number) {
    this.postsService.deletePost(id);
  }
}
