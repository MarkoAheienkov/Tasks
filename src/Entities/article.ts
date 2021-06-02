import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Sections from './section';
import Users from './user';

@Entity()
class Articles {
  @PrimaryGeneratedColumn()
  article_id?: number;

  @Column()
  title?: string;

  @Column()
  cover?: string;

  @Column()
  approved?: boolean;

  @ManyToOne(
    type => Users,
    user => user.user_id,
  )
  creator?: Users;

  @OneToMany(
    type => Sections,
    section => section.article_id,
    { onDelete: 'CASCADE' },
  )
  sections?: Sections[];
}

export default Articles;
