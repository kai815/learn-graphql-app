import { Args, Query, Resolver,Mutation,ResolveField,Parent } from '@nestjs/graphql';
import { UserModel } from './interfaces/user.model';
import { UserService } from './user.service';
import {PhotoModel} from "@/components/photos/interfaces/photo.model";
import {PhotoService} from "@/components/photos/photo.service";
import {CurrentUser} from "@/components/users/currentUser.decorator";
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "@/components/auth/auth.guard";


@Resolver((of) => UserModel)
export class UsersResolver {
  constructor(private userService: UserService,private photoService: PhotoService) {}

  @Query(() => [UserModel], { name: 'allUsers', nullable: true })
  async allUsers() {
    return this.userService.allUser()
  }
  @Query(() => UserModel, { name: 'me', nullable: true })
  @UseGuards(AuthGuard)
  async me(@CurrentUser() user:any) {
    return user
  }
  @ResolveField('postedPhotos', returns => [PhotoModel])
  async getPosts(@Parent() user: UserModel) {
    const { githubLogin } = user;
    return this.photoService.findAll({ userId: githubLogin });
  }
}