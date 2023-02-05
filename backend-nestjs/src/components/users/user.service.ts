import { Injectable } from '@nestjs/common';
import { UserModel } from './interfaces/user.model';

type User  = Omit<UserModel,"postedPhotos">

@Injectable()
export class UserService {
  //DBの代わり
  users: User[] = [
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
  allUser(): User[] {
    return this.users;
  }
  findOne({githubLogin}:{githubLogin:string}):User{
    return this.users.find(user => user.githubLogin === githubLogin)
  }
}

