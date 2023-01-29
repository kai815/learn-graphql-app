import { Args, Query, Resolver } from '@nestjs/graphql';
import { PhotoModel } from './interfaces/photo.model';

@Resolver((of) => PhotoModel)
export class PhotosResolver {
  constructor() {}

  @Query(() => [PhotoModel], { name: 'allPhotos', nullable: true })
  async allPhotos() {
    return [
      {
        id: '1',
        url: 'NestJS is so good.',
        name:'photo1',
        description:'des'
      },
      {
        id: '2',
        url: 'NestJS is so good.',
        name:'photo2'
      },
    ];
  }
}