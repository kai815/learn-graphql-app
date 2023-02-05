import { Module } from '@nestjs/common';
import {UsersResolver} from "./user.resolver";
import {UserService} from "./user.service";
import {PhotoService} from "@/components/photos/photo.service";

@Module({
  providers:[UsersResolver,UserService,PhotoService]
})
export class UsersModule {}
