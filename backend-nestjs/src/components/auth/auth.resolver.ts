import { Args, Resolver,Mutation } from '@nestjs/graphql';
import {PubSub} from "graphql-subscriptions";
import {AuthModel} from "./interfaces/auth.model";
import {UserService} from "@/components/users/user.service"
import {AuthService} from "@/components/auth/auth.service"


const pubSub = new PubSub();

@Resolver((of) => AuthModel)
export class AuthResolver {
  constructor(private userService: UserService ,private authService: AuthService) {}

  @Mutation(() => AuthModel, {name:'gitHubAuth'})
  async githubAuth(@Args('code') code:string) {
    const { access_token } = await this.authService.requestGithubToken(code)
    const resultUser = await this.authService.requestGithubUserAccount(access_token)
    const createdUser = await this.userService.save({
      name:resultUser.name,
      githubLogin:resultUser.login,
      githubToken:access_token,
      avatar:resultUser.avatar_url
    })
    await pubSub.publish('newUser', {newUser: createdUser})
    return {
      token:access_token,
      user:{
        name:createdUser.name,
        githubLogin:createdUser.githubLogin,
        avatar:createdUser.avatar
      }
    }
  }
}
