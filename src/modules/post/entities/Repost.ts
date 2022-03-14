import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { User } from '../../account/entities/User';
import { Post } from './Post';

@Entity('repost')
export class Repost {
  @PrimaryColumn()
  id: string;

  @Column()
  creatorId: string;

  @ManyToOne(() => User, (user) => user.reposts)
  creator: User;

  @Column()
  originalPostId: string;

  @ManyToOne(() => Post, (post) => post.reposts)
  originalPost: Post;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}
