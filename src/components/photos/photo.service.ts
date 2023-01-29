import { Injectable } from '@nestjs/common';
import { PhotoModel } from './interfaces/photo.model';

@Injectable()
export class PhotoService {
  private photos: PhotoModel[] = [
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

  // 全件取得のメソッド
  allPhoto(): PhotoModel[] {
    return this.photos;
  }
}

