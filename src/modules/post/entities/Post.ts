import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { User } from '@modules/account/entities/User';

import { QuotePost } from './QuotePost';
import { Repost } from './Repost';

@Entity('post')
export class Post {
  @PrimaryColumn()
  id: string;

  @Column()
  message: string;

  @Column()
  creatorId: string;

  @ManyToOne(() => User, (user) => user.posts)
  creator: User;

  @OneToMany(() => Repost, (repost) => repost.originalPost)
  reposts: Repost[];

  @OneToMany(() => QuotePost, (quotePost) => quotePost.originalPost)
  quotePosts: QuotePost[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}
