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

import { User } from '../../account/entities/User';
import { Repost } from './Repost';

@Entity('post')
export class Post {
  @PrimaryColumn()
  id: string;

  @Column()
  message: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Repost, (repost) => repost.originalPost)
  reposts: Repost[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}
