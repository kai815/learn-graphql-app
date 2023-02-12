import { Args, Query, Resolver,Mutation,ResolveField,Parent } from '@nestjs/graphql';
import {AuthModel} from "./interfaces/auth.model";
import {UserService} from "@/components/users/user.service"
import {AuthService} from "@/components/auth/auth.service"

@Resolver((of) => AuthModel)
export class AuthResolver {
  constructor(private userService: UserService ,private authService: AuthService) {}

  @Mutation(() => AuthModel, {name:'gitHubAuth'})
  async githubAuth(@Args('code') code:string) {
    const { access_token } = await this.authService.requestGithubToken(code)
    const resultUser = await this.authService.requestGithubUserAccount(access_token)
    return {
      token:access_token,
      user:{
        name:resultUser.name,
        githubLogin:resultUser.login,
        avatar:resultUser.avatar_url
      }
    }
  }
}