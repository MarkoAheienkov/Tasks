import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Sections from './section';

@Entity()
class Images {
  @PrimaryGeneratedColumn()
  image_id?: number;

  @Column()
  image_url?: string;

  @ManyToOne(
    type => Sections,
    section => section.section_id,
    { onDelete: 'CASCADE' },
  )
  section_id?: number;
}

export default Images;
