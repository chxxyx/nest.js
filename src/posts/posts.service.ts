import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';


/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commCount: number;
 */
 export interface PostModel {
    id: number;
    author: string;
    title: string;
    content: string;
    likeCount: number;
    commCount: number;
  }
  
  let posts : PostModel[] = [
    {
      id: 1,
      author: 'newjeans_official',
      title: '뉴진스 민지',
      content: '강아지 민지',
      likeCount: 1000000,
      commCount: 999999,
    },
    {
      id: 2,
      author: 'newjeans_official',
      title: '뉴진스 해린',
      content: '고양이 해린이',
      likeCount: 1000000,
      commCount: 999999,
    },
    {
      id: 3,
      author: 'blackpink_official',
      title: '지수',
      content: '공연 중인 지수',
      likeCount: 1000000,
      commCount: 999999,
    }
  ]
  
@Injectable() // === 주입할 수 있다는 뜻
export class PostsService {

    constructor(
      @InjectRepository(PostsModel) //typeorm에서 주입받는 것.
      private readonly postsRepository: Repository<PostsModel> // 모델을 제너릭으로 받음
    ){}
    async getAllPosts() { 

      // return posts;
        return this.postsRepository.find(); // 레포지토리의 모든 함수들은 async, 비동기이다.
    }

    async getPostById(id: number) {
        // const post = posts.find((post) => post.id === +id); // 스트링 값인데 위에는 숫자이므로 +를 해주어 숫자 타입으로 비교 
        // // find() : 처음으로 찾은 해당 데이터를 반환을 해주고, 만약에 끝까지 못 찾으면 undifined 반환한다.
    
        // if(!post) { // post === undifined 
        //   throw new NotFoundException();
        // }
        // return post;

        // 무언가를 필터할 때 ? where !
        const post = await this.postsRepository.findOne({
          where: {
            id,
          }
        });

        if(!post) {
          throw new NotFoundException();
        }

        return post;

    }

    async createPost(author: string, title: string, content: string) {
      // 1) create -> 저장할 객체를 생성한다. (객체 생성 확인)
      // 2) save -> 객체를 저장한다. (저장)

      // create는 저장이 아닌 생성만 하기 때문에 비동기가 아닌 동기로 이루어진다.
      const post = this.postsRepository.create({
        author,
        title,
        content,
        likeCount: 0,
        commentCount: 0
      });
        // const post = {
        //     id: posts[posts.length - 1].id + 1,
        //     author, 
        //     title,
        //     content,
        //     likeCount: 0,
        //     commCount: 0
        //   }
      
        //   posts = [
        //     ...posts,
        //     post
        //   ]

        // 실제 DB에 저장되는 모든 정보 포함해서 데이터가 입력된다 (id 값까지)
        const newSavePost = await this.postsRepository.save(post);
      
          return newSavePost;
    }

    async updatePost(postId: number, author?: string, title?: string, content?: string) {
      // - save의 기능
      //  1. 만약에 데이터가 존재하지 않는다면 (id 기준으로) 새로 생성한다.
      //  2. 만약에 데이터가 존재한다면 (같은 id 값이 존재한다면) 그 존재하던 값을 업데이트한다.

      const post = await this.postsRepository.findOne({
        where: {
          id: postId,

        }
      })
     // const post = posts.find(post => post.id === postId); 

        if(!post) {
        throw new NotFoundException();
        }

        if(author) {
        post.author = author;
        }

        if(title) {
        post.title = title;
        }

        if(content) {
        post.content = content;
        }

        const newPost = await this.postsRepository.save(post);

      // path에서 넘겨 받은 id 값과 포스트 리스트의 아이디값이 같으면 새로 만든 포스트로 변경, 아니면 원래 있던 값 
      //  posts = posts.map((prevPost => prevPost.id === postId ? post : prevPost))

        return newPost;
    }

    async deletePost(id: number) {

      const post = await this.postsRepository.findOne({
        where: {id}
      })
        // 삭제할 포스트 id가 없을 경우에 대한 에러 처리
        // const post = posts.find(post => post.id === +id); 

        if(!post) {
        throw new NotFoundException();
        }

        // posts = posts.filter(post => post.id !== +id);

        await this.postsRepository.delete(id);

        return id;
    }
}
