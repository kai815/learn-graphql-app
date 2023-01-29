import { Args, Query, Resolver,Mutation } from '@nestjs/graphql';
import { PhotoModel } from './interfaces/photo.model';
import { CreatePhotoDto } from './dto/createPhoto.dto';
import { PhotoService } from './photo.service';

@Resolver((of) => PhotoModel)
export class PhotosResolver {
  constructor(private photoService: PhotoService) {}

  @Query(() => [PhotoModel], { name: 'allPhotos', nullable: true })
  async allPhotos() {
    return this.photoService.allPhoto()
  }
  @Mutation(() => PhotoModel)
  async postPhoto(@Args('inputPhoto') inputPhoto:CreatePhotoDto){
    return this.photoService.postPhoto(inputPhoto)
  }
}