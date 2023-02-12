import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import {User, UserDocument} from "@/components/users/schemas/user.schema";
import  { Model } from "mongoose";

type InputCreateUser = {
  name: string,
  githubLogin: string,
  githubToken: string,
  avatar:string
}

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userMongoModel: Model<UserDocument>) {}
  // 全件取得のメソッド
  async allUser(): Promise<User[]> {
    return this.userMongoModel.find().exec();
  }
  async findOne({githubLogin}:{githubLogin:string}):Promise<User>{
    return this.userMongoModel.findOne({githubLogin}).exec();
  }
  async save(inputCreateUser:InputCreateUser):Promise<User>{
    const createUser = new this.userMongoModel({...inputCreateUser})
    ;
    return createUser.save();
  }
  async authorizeUser(token:string):Promise<User>{
    return this.userMongoModel.findOne({token}).exec();
  }
}

