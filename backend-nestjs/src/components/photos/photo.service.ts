import { Injectable } from '@nestjs/common';
import { PhotoModel } from './interfaces/photo.model';
import { CreatePhotoDto } from './dto/createPhoto.dto';

@Injectable()
export class PhotoService {
  photos: PhotoModel[] = [
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
  //保存
  postPhoto(inputPhoto:CreatePhotoDto):PhotoModel{
    const lastId = this.photos[this.photos.length - 1].id
    const newId = Number(lastId) + 1;
    const newPhoto =  {
      ...inputPhoto,
      id:newId
    }
    // @ts-ignore
    this.photos.push(newPhoto)
    return newPhoto as unknown as PhotoModel
  }
}

