import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Comments from './comment';

@Entity()
class Replies {
  @PrimaryGeneratedColumn()
  comment_reply_id?: number;

  @ManyToOne(
    type => Comments,
    comment => comment.comment_id,
  )
  comment_id?: number;

  @OneToOne(
    type => Comments,
    comment => comment.reply_id,
  )
  @JoinColumn()
  reply_id?: Comments;
}

export default Replies;
