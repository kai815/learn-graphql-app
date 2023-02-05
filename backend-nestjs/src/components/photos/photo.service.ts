import { Injectable } from '@nestjs/common';
import { PhotoModel } from './interfaces/photo.model';
import { CreatePhotoDto } from './dto/createPhoto.dto';

export type Photo = Omit<PhotoModel,'postedBy'> & {userId:string}

@Injectable()
export class PhotoService {
  //DBの代わり
  photos: Photo[] = [
    {
      id: '1',
      url: 'NestJS is so good.',
      name:'photo1',
      description:'des',
      userId:'1'
    },
    {
      id: '2',
      url: 'NestJS is so good.',
      name:'photo2',
      userId:'2'
    },
    {
      id: '3',
      url: 'NestJS is so good.',
      name:'photo3',
      userId:'1'
    },
  ];

  // 全件取得のメソッド
  allPhoto(): Photo[] {
    return this.photos;
  }
  findAll({userId}:{userId: string}): Photo[] {
    return this.photos.filter((photo) => photo.userId === userId)
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

