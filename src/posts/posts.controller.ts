import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts') // 이 클래스 안의 모든 엔드포인트들의 접두어, prefix를 붙이는 역할
export class PostsController {

  // postService: PostService;
  constructor(private readonly postsService: PostsService) {} // postservice 주입

  // -> 그런데 우리는 주입을 한 적이 없다.
  // IoC 컨테이너가 주입되어야 하는 서비스들을 자동으로 생성해준다.
  // 이걸 모듈에서 확인할 수 있다.

  // @Get() // 여기서부터는 중첩된다. ex) /posts/post
  // getPost(): PostModel {
  //   return {
  //     author: 'newjeans_officical',
  //     title: '뉴진스 민지',
  //     content: '강아지 민지',
  //     likeCount: 100000000,
  //     commCount: 999999,
  //   }
  // }

  // ---------------------------------------------------------

  // 1) GET /posts
  // 모든 post를 다 가져온다.
  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  // 2) GET /posts/:id (path Parameter);
  //  id에 해당되는 post를 가져온다.
  //  예를 들어서 id=1일 경우 id가 1인 포스트를 가져온다.
  @Get(':id') // path parameter 
          // 파라미터 이름은 'id', 이건 스트링 값으로 타입 지정 
  getPost(@Param('id') id: string) { // 모든 파라미터 값은 별도의 작업을 해주지 않는 이상 기본 스트링으로 들어간다.
    return this.postsService.getPostById(+id); // number 예상하므로 + 붙여줌 
  }

  // 3) POST /posts
  //  POST를 생성한다
  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ){
   return this.postsService.createPost(author, title, content);
  }


  // 4) PUT /posts/:id
  // id에 해당되는 post를 변경한다.
  @Patch(':id')
  putPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string, 
  ){
    return this.postsService.updatePost(+id, author, title, content);
  }
  
  // 5) DELETE /posts/:id
  // id에 해당되는 post를 삭제한다.
  @Delete(':id')
  deletePost(
    @Param('id') id: string,
  ){
    return this.postsService.deletePost(+id);
  }

}
