import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('user')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable()
  followers: this[];

  @ManyToMany(() => User, (user) => user.followers)
  following: this[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}
