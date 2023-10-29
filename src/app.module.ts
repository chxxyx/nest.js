import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModel } from './posts/entities/posts.entity';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5500,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [PostsModel,],
      synchronize: true,

    }),
  ], //다른 모듈을 불러올 때 사용하는 것 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
