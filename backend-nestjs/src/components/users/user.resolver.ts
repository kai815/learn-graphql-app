import { Args, Query, Resolver,Mutation } from '@nestjs/graphql';
import { UserModel } from './interfaces/user.model';
import { UserService } from './user.service';


@Resolver((of) => UserModel)
export class UsersResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserModel], { name: 'allUsers', nullable: true })
  async allPhotos() {
    return this.userService.allUser()
  }
}