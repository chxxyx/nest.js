import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostsModel {

    @PrimaryGeneratedColumn() // 우리가 따로 id 값을 입력할 필요없이 postgresql에서 자동으로 id 값 하나씩 배정
    id: number;

    @Column()
    author: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    likeCount: number;

    @Column()
    commentCount: number;
}