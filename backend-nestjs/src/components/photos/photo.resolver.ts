import {Args, Query, Resolver, Mutation, ResolveField, Parent} from '@nestjs/graphql';
import { Req, UseGuards } from '@nestjs/common';
import { PhotoModel } from './interfaces/photo.model';
import { CreatePhotoDto } from './dto/createPhoto.dto';
import { PhotoService } from './photo.service';
import {Photo} from './schemas/photo.schema'
import {UserModel} from "@/components/users/interfaces/user.model";
import {UserService} from "@/components/users/user.service";
import {AuthGuard} from "@/components/auth/auth.guard"
import {CurrentUser} from "@/components/users/currentUser.decorator"

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
    console.log({user})
    return await this.photoService.postPhoto(inputPhoto)
  }
  @ResolveField('postedBy', returns =>UserModel)
  async getPostedBy(@Parent() photo: Photo) {
    const { userId } = photo;
    return this.userService.findOne({githubLogin: userId});
  }
}