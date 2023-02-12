import {Args, Query, Resolver, Mutation, ResolveField, Parent} from '@nestjs/graphql';
import { PhotoModel } from './interfaces/photo.model';
import { CreatePhotoDto } from './dto/createPhoto.dto';
import { PhotoService } from './photo.service';
import {Photo} from './schemas/photo.schema'
import {UserModel} from "@/components/users/interfaces/user.model";
import {UserService} from "@/components/users/user.service";

@Resolver((of) => PhotoModel)
export class PhotosResolver {
  constructor(private photoService: PhotoService,private userService: UserService) {}

  @Query(() => [PhotoModel], { name: 'allPhotos', nullable: true })
  async allPhotos() {
    const result = await this.photoService.allPhoto()
    return result
  }
  @Mutation(() => PhotoModel)
  async postPhoto(@Args('inputPhoto') inputPhoto:CreatePhotoDto){
    return await this.photoService.postPhoto(inputPhoto)
  }
  @ResolveField('postedBy', returns =>UserModel)
  async getPostedBy(@Parent() photo: Photo) {
    const { userId } = photo;
    return this.userService.findOne({githubLogin: userId});
  }
}