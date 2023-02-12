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
      category:1,
      description:'des',
      userId:'1',
      created: "2023-01-09T07:16:47.883+00:00"
    },
    {
      id: '2',
      url: 'NestJS is so good.',
      name:'photo2',
      category:2,
      userId:'2',
      created: "2023-01-10T07:16:47.883+00:00"
    },
    {
      id: '3',
      url: 'NestJS is so good.',
      name:'photo3',
      category:3,
      userId:'1',
      created: "2023-01-11T07:16:47.883+00:00"
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

