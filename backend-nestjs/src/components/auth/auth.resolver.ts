import { Args, Query, Resolver,Mutation,ResolveField,Parent } from '@nestjs/graphql';
import {AuthModel} from "./interfaces/auth.model";
import {UserService} from "@/components/users/user.service"
import {AuthService} from "@/components/auth/auth.service"

@Resolver((of) => AuthModel)
export class AuthResolver {
  constructor(private userService: UserService ,private authService: AuthService) {}

  @Mutation(() => AuthModel, {name:'gitHubAuth'})
  async githubAuth(@Args('code') code:string) {
    const result = await this.authService.requestGithubToken(code)
    console.log({result})
    return {token:"token",user:{name:"1"}}
  }
}