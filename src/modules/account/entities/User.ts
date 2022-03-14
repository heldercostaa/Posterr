import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Post } from '../../post/entities/Post';

@Entity('user')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable({
    name: 'user_follow_user',
    joinColumn: {
      name: 'user_being_followed_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_who_follows_id',
      referencedColumnName: 'id',
    },
  })
  followers: this[];

  @ManyToMany(() => User, (user) => user.followers)
  following: this[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}
