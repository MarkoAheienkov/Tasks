import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Comments from './comment';
import Users from './user';

@Entity()
class Posts {
  @PrimaryGeneratedColumn() post_id?: number;

  @Column() title?: string;

  @Column({
    type: 'time without time zone',
    default: 'now()',
  })
  created_at?: Date;

  @Column('text') body?: string;

  @ManyToOne(
    type => Users,
    user => user.user_id,
  )
  creator?: Users;

  @OneToMany(
    type => Comments,
    comment => comment.post_id,
  )
  comments?: Comments[];
}

export default Posts;
