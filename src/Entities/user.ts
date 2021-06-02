import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Articles from './article';
import Comments from './comment';
import Posts from './post';

@Entity()
class Users {
  @PrimaryGeneratedColumn() user_id?: number;

  @Column() username?: string;

  @Column() is_admin?: boolean;

  @Column() email?: string;

  @Column({
    nullable: true,
    type: 'time without time zone',
  })
  date_of_birth?: Date;

  @Column({
    default: 'now()',
    type: 'time without time zone',
  })
  created_at?: Date;

  @Column() password?: string;

  @OneToMany(
    type => Posts,
    post => post.creator,
  )
  posts?: Posts[];

  @OneToMany(
    type => Comments,
    comment => comment.creator,
  )
  comments?: Comments[];

  @OneToMany(
    type => Articles,
    article => article.creator,
  )
  articles?: Articles[];
}

export default Users;
