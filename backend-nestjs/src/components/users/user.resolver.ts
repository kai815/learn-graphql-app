import {Args, Query, Resolver, Mutation, ResolveField, Parent, Subscription} from '@nestjs/graphql';
import { PubSub } from "graphql-subscriptions";
import { UserModel } from './interfaces/user.model';
import { UserService } from './user.service';
import {PhotoModel} from "@/components/photos/interfaces/photo.model";
import {PhotoService} from "@/components/photos/photo.service";
import {CurrentUser} from "@/components/users/currentUser.decorator";
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "@/components/auth/auth.guard";


const pubSub = new PubSub();

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

  @Mutation(()=>[UserModel],{name:'addFakeUsers',nullable:true})
  async addFakeUsers(@Args('count') count:number){
    const result =  await this.userService.addFakeUsers(count)
    result.forEach((createdUser)=>{
      pubSub.publish('newUser',{newUser:createdUser})
    })
    return result
  }
  @Subscription((returns) => UserModel,{name:'newUser'})
  newUser() {
    return pubSub.asyncIterator('newUser');
  }
  @ResolveField('postedPhotos', returns => [PhotoModel])
  async getPosts(@Parent() user: UserModel) {
    const { githubLogin } = user;
    return this.photoService.findAll({ userId: githubLogin });
  }
}