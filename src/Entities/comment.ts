import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Posts from './post';
import Replies from './reply';
import Users from './user';

@Entity()
class Comments {
  @PrimaryGeneratedColumn()
  comment_id?: number;

  @Column('text')
  text?: string;

  @Column()
  is_reply?: boolean;

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

  @OneToOne(
    () => Replies,
    reply => reply.reply_id,
  )
  reply_id?: Replies;

  @OneToMany(
    type => Replies,
    reply => reply.comment_id,
  )
  replies?: Replies[];
}

export default Comments;
