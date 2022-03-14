import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { User } from '@modules/account/entities/User';

import { Post } from './Post';

@Entity('quote_post')
export class QuotePost {
  @PrimaryColumn()
  id: string;

  @Column()
  message: string;

  @Column()
  creatorId: string;

  @ManyToOne(() => User, (user) => user.quotePosts)
  creator: User;

  @Column()
  originalPostId: string;

  @ManyToOne(() => Post, (post) => post.quotePosts)
  originalPost: Post;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}
