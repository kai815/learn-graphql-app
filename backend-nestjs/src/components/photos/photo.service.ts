import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/createPhoto.dto';
import { InjectModel } from "@nestjs/mongoose";
import {Photo, PhotoDocument} from "@/components/photos/schemas/photo.schema";
import  { Model } from "mongoose";

@Injectable()
export class PhotoService {
  constructor(@InjectModel(Photo.name) private photoMongoModel: Model<PhotoDocument>) {}

  // 全件取得のメソッド
  async allPhoto(): Promise<Photo[]> {
    const result = this.photoMongoModel.find().exec()
    return result
  }
  async findAll({userId}:{userId: string}): Promise<Photo[]> {
    return this.photoMongoModel.find({userId}).exec()
  }
  //保存
  async postPhoto(inputPhoto:CreatePhotoDto):Promise<Photo>{
    const createPhoto = new this.photoMongoModel({
      url:inputPhoto.url,
      name:inputPhoto.name,
      category:inputPhoto.category,
      description:inputPhoto.description,
      created:new Date()
    });
    return createPhoto.save();
  }
}

