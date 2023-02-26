import {Args, Query, Resolver, Mutation, ResolveField, Parent, Subscription} from '@nestjs/graphql';
import { PubSub } from "graphql-subscriptions";
import { Req, UseGuards } from '@nestjs/common';
import { PhotoModel } from './interfaces/photo.model';
import { CreatePhotoDto } from './dto/createPhoto.dto';
import { PhotoService } from './photo.service';
import {Photo} from './schemas/photo.schema'
import {UserModel} from "@/components/users/interfaces/user.model";
import {UserService} from "@/components/users/user.service";
import {AuthGuard} from "@/components/auth/auth.guard"
import {CurrentUser} from "@/components/users/currentUser.decorator"

const pubSub = new PubSub();

@Resolver((of) => PhotoModel)
export class PhotosResolver {
  constructor(private photoService: PhotoService,private userService: UserService) {}
  @Query(() => [PhotoModel], { name: 'allPhotos', nullable: true })
  async allPhotos() {
    const result = await this.photoService.allPhoto()
    return result
  }
  @Mutation(() => PhotoModel)
  @UseGuards(AuthGuard)
  async postPhoto(@Args('inputPhoto') inputPhoto:CreatePhotoDto,@CurrentUser() user:any){
    const postPhoto = await this.photoService.postPhoto({inputPhoto,currentUserId:user.githubLogin})
    // 第二引数のproperty名もphotoPostedで合わせる
    await pubSub.publish('newPhoto', {newPhoto:postPhoto});
    return postPhoto;
  }
  //メモ：戻り値をPhotoModelじゃなくてPhotoにしてたのでMake sure your class is decorated with an appropriate decorator.のエラーが出てた
  @Subscription((returns) => PhotoModel,{name:'newPhoto'})
  newPhoto() {
    return pubSub.asyncIterator('newPhoto');
  }
  @ResolveField('postedBy', returns =>UserModel)
  async getPostedBy(@Parent() photo: Photo) {
    const { userId } = photo;
    return this.userService.findOne({githubLogin: userId});
  }
}
