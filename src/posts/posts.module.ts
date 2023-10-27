import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  controllers: [PostsController], // nest 안에서 컨트롤러로 사용하겠다는 등록
  providers: [PostsService], // 어떤 역할을 하는 지에 대한 정의, 주입 시켜야 하는 게 있다면 providers 안에 넣어주면 됨

})
export class PostsModule {}
