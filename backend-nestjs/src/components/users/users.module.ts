import { Module } from '@nestjs/common';
import {UsersResolver} from "./user.resolver";
import {UserService} from "./user.service";

@Module({
  providers:[UsersResolver,UserService]
})
export class UsersModule {}
