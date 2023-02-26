import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/createPhoto.dto';
import { InjectModel } from "@nestjs/mongoose";
import {Photo, PhotoDocument} from "@/components/photos/schemas/photo.schema";
import  { Model } from "mongoose";
import path = require("path");
import { createWriteStream } from "fs";

type postPhotoArgs = {
  inputPhoto:CreatePhotoDto
  currentUserId:string
}

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
  async postPhoto({inputPhoto,currentUserId}:postPhotoArgs):Promise<Photo>{
    const { createReadStream,filename } = await inputPhoto.image;
    const result = await createReadStream().pipe(createWriteStream(path.join(process.cwd(), `./src/upload/${filename}`)))
    console.log({result})
    const createPhoto = new this.photoMongoModel({
      url:inputPhoto.url,
      name:inputPhoto.name,
      category:inputPhoto.category,
      description:inputPhoto.description,
      userId:currentUserId,
      created:new Date()
    });
    return createPhoto.save();
  }
}

