import { Injectable, NotFoundException } from '@nestjs/common';


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

    getAllPosts() {
        return posts;
    }

    getPostById(id: number) {
        const post = posts.find((post) => post.id === +id); // 스트링 값인데 위에는 숫자이므로 +를 해주어 숫자 타입으로 비교 
        // find() : 처음으로 찾은 해당 데이터를 반환을 해주고, 만약에 끝까지 못 찾으면 undifined 반환한다.
    
        if(!post) { // post === undifined 
          throw new NotFoundException();
        }
        return post;
    }

    createPost(author: string, title: string, content: string) {
        const post = {
            id: posts[posts.length - 1].id + 1,
            author, 
            title,
            content,
            likeCount: 0,
            commCount: 0
          }
      
          posts = [
            ...posts,
            post
          ]
      
          return post;
    }

    updatePost(postId: number, author?: string, title?: string, content?: string) {
        const post = posts.find(post => post.id === postId); 

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

        // path에서 넘겨 받은 id 값과 포스트 리스트의 아이디값이 같으면 새로 만든 포스트로 변경, 아니면 원래 있던 값 
        posts = posts.map((prevPost => prevPost.id === postId ? post : prevPost))

        return post;
    }

    deletePost(id: number) {

        // 삭제할 포스트 id가 없을 경우에 대한 에러 처리
        const post = posts.find(post => post.id === +id); 

        if(!post) {
        throw new NotFoundException();
        }

        posts = posts.filter(post => post.id !== +id);
        return id;
    }
}
