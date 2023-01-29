import { Args, Query, Resolver } from '@nestjs/graphql';
import { PhotoModel } from './interfaces/photo.model';
import { PhotoService } from './photo.service';

@Resolver((of) => PhotoModel)
export class PhotosResolver {
  constructor(private photoService: PhotoService) {}

  @Query(() => [PhotoModel], { name: 'allPhotos', nullable: true })
  async allPhotos() {
    return this.photoService.allPhoto()
  }
}