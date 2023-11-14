import { Injectable, NotFoundException } from "@nestjs/common";
import { PostModelDto } from "./post-model.dto";
import { Builder } from "builder-pattern";


// 레포지토리 대용 임시 메모리 데이터
let posts: PostModelDto[] = [
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

@Injectable()
export class PostsService {
  getAllPosts() {
    return posts;
  }

  getPostById(id: number) {
    const post = posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  createPost(post: PostModelDto) {
    const id = posts[posts.length - 1].id + 1;
    post.id = id;
    posts = [...posts, post];

    return post;
  }

  updatePost(id: number, post: PostModelDto) {
    const findPost = posts.find((post) => post.id === id);
    if (!findPost) {
      throw new NotFoundException();
    }
    findPost.updatePost(post);
    return findPost;
  }

  deletePost(id: number) {
    posts = posts.filter((post) => post.id !== id);
  }
}
