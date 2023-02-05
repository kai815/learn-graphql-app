import { Injectable } from '@nestjs/common';
import { UserModel } from './interfaces/user.model';

@Injectable()
export class UserService {
  users: UserModel[] = [
    {
      githubLogin: '1',
      name:'user1',
      avatar: 'avatar1.',
    },
    {
      githubLogin: '2',
      name:'user2',
      avatar: 'avatar2.',
    },
  ];

  // 全件取得のメソッド
  allUser(): UserModel[] {
    return this.users;
  }
}

