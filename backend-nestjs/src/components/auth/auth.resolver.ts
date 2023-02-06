import { Args, Query, Resolver,Mutation,ResolveField,Parent } from '@nestjs/graphql';
import {AuthModel} from "./interfaces/auth.model";
import {UserService} from "@/components/users/user.service"

@Resolver((of) => AuthModel)
export class AuthResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => AuthModel, {name:'gitHubAuth'})
  async githubAuth(@Args('code') code:string) {
    return {token:"token",user:{name:"1"}}
  }
}