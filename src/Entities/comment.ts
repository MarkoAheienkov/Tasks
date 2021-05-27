import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Posts from './post';
import Users from './user';

@Entity()
class Comments {
  @PrimaryGeneratedColumn()
  comment_id?: number;

  @Column('text')
  text?: string;

  @ManyToOne(
    type => Users,
    user => user.user_id,
  )
  creator?: Users;

  @ManyToOne(
    type => Posts,
    post => post.post_id,
  )
  post_id?: Posts;
}

export default Comments;
