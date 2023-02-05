import { Args, Query, Resolver,Mutation,ResolveField,Parent } from '@nestjs/graphql';
import { UserModel } from './interfaces/user.model';
import { UserService } from './user.service';
import {PhotoModel} from "@/components/photos/interfaces/photo.model";
import {PhotoService} from "@/components/photos/photo.service";


@Resolver((of) => UserModel)
export class UsersResolver {
  constructor(private userService: UserService,private photoService: PhotoService) {}

  @Query(() => [UserModel], { name: 'allUsers', nullable: true })
  async allUsers() {
    return this.userService.allUser()
  }
  @ResolveField('postedPhotos', returns => [PhotoModel])
  async getPosts(@Parent() user: UserModel) {
    const { githubLogin } = user;
    return this.photoService.findAll({ userId: githubLogin });
  }
}