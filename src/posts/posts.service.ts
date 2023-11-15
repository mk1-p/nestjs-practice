import { Injectable, NotFoundException } from "@nestjs/common";
import { PostsDto } from "./posts.dto";
import { Repository } from "typeorm";
import { PostsModel } from "./entities/posts.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable() // 주입 가능하도록 하는 데코레이션
export class PostsService {
  constructor(
    @InjectRepository(PostsModel) // Repository 의존성 주입
    private readonly postsRepository: Repository<PostsModel>
  ) {}

  async getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id: id, // 키값과 동일한 명칭인 경우 생략 가능!
      }
    });

    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  async createPost(postsDto: PostsDto) {
    // create로 엔티티 생성,
    // save로 저장
    const post = this.postsRepository.create({
      author: postsDto.author,
      title: postsDto.title,
      content: postsDto.content,
      likeCount: 0,
      commentCount: 0,
    });

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async updatePost(id: number, postsDto: PostsDto) {
    // save 기능
    // 1) 데이터가 존재하지 않는 경우(PK 기준) 새로 생성
    // 2) 데이터가 존재하는 경우(PK 기준) 업데이트
    const post = await this.postsRepository.findOne({
      where: {
        id: id,
      }
    });

    // 데이터가 없는 경우, 에러 반환
    if (!post) {
      throw new NotFoundException();
    }

    post.author = postsDto.author !== null ? postsDto.author : post.author;
    post.title = postsDto.title !== null ? postsDto.title : post.title;
    post.content = postsDto.content !== null ? postsDto.content : post.content;

    // Spring JPA의 영속성과는 다른가??
    const newPost = await this.postsRepository.save(post);

    return newPost;

  }

  async deletePost(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id: id,
      }
    });
    if (!post) {
      throw new NotFoundException();
    }
    await this.postsRepository.delete(id);
  }
}
