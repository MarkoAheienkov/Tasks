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
