import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import {User, UserDocument} from "@/components/users/schemas/user.schema";
import  { Model } from "mongoose";
import {catchError, lastValueFrom, map} from "rxjs";
import {AxiosError, AxiosResponse} from "axios/index";
import {HttpService} from "@nestjs/axios";

type InputCreateUser = {
  name: string,
  githubLogin: string,
  githubToken: string,
  avatar:string
}

type RandomUser = {
  login:{
    username:string
    sha1:string
  }
  name:{
    first:string
    last:string
  }
  picture:{
    thumbnail:string
  }
}

type RandomUserResults = {
  results:Array<RandomUser>
}


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userMongoModel: Model<UserDocument>,
    private readonly httpService: HttpService)
  {}
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

  async addFakeUsers(count:number):Promise<any>{
    const { results } = await lastValueFrom(this.httpService.get(
      `https://randomuser.me/api/?results=${count}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept:'application/json',
        }})
      .pipe(map((response:AxiosResponse<RandomUserResults>) => {
        return response.data
      }))
      .pipe(catchError((error: AxiosError) => {
        console.log({error})
        throw 'addFakeUsers An error happened!';
      }))
    )
    const result = results.map((fakeUser)=>{
      const createUser = new this.userMongoModel({
        name:`${fakeUser.name.first} ${fakeUser.name.last}`,
        githubLogin: fakeUser.login.username,
        githubToken: fakeUser.login.sha1,
        avatar:fakeUser.picture.thumbnail
      })
      return createUser.save()
    })
    return result
  }
  //本当はauthserviceがいいかもだけど手っ取り早くuserMongoModelを使いたかったので
  async authorizeUser(token:string):Promise<User>{
    if(!token){
      throw 'authorizeUser no token';
    }
    return this.userMongoModel.findOne({token}).exec();
  }
}

