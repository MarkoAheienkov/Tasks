import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Articles from './article';
import Images from './image';

@Entity()
class Sections {
  @PrimaryGeneratedColumn()
  section_id?: number;

  @Column()
  title?: string;

  @Column('text')
  text?: string;

  @ManyToOne(
    type => Articles,
    article => article.article_id,
    { onDelete: 'CASCADE' },
  )
  article_id?: number;

  @OneToMany(
    type => Images,
    image => image.section_id,
    { cascade: true },
  )
  images?: Images[];
}

export default Sections;
