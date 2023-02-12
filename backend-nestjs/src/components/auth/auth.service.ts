import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {catchError, lastValueFrom, map} from 'rxjs';
import {AxiosError} from "axios";

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async requestGithubToken(code: string) {
    const body = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code
    }
    console.log({body})
    const result =  await lastValueFrom(this.httpService.post(`https://github.com/login/oauth/access_token`,{
      body:body,
      headers: {
        'Content-Type': 'application/json',
        Accept:'application/json'
      }
    }).pipe(map((response) => {
      console.log({response})
      return response.data
    })).pipe(catchError((error: AxiosError) => {
      console.log({error})
      throw 'An error happened!';
    }),))
    return result
  }
}

