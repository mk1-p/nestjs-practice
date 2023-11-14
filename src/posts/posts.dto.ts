import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class PostsDto {

  @IsInt()
  @IsOptional()
  id: number;
  @IsNotEmpty()
  author: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  content: string;
  @IsInt()
  @IsOptional()
  likeCount: number = 0;
  @IsInt()
  @IsOptional()
  commentCount: number = 0;

  constructor(id: number, author: string, title: string, content: string, likeCount: number, commentCount: number) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.content = content;
    this.likeCount = likeCount;
    this.commentCount = commentCount;
  }

  updatePost(post: PostsDto) {
    this.author = post.author !== null ? post.author : this.author;
    this.title = post.title !== null ? post.title : this.title;
    this.content = post.content !== null ? post.content : this.content;
  }
}
