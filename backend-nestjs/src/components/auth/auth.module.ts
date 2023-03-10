import { Module } from '@nestjs/common';
import {AuthResolver} from '@/components/auth/auth.resolver'
import {AuthService} from '@/components/auth/auth.service'
import {UserService} from "@/components/users/user.service";
import {HttpModule} from "@nestjs/axios";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "@/components/users/schemas/user.schema";
import { AuthGuard } from '@/components/auth/auth.guard';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature(
      [
        { name:User.name, schema: UserSchema }
      ]
    )
  ],
  providers:[AuthResolver,UserService,AuthService,AuthGuard]
})
export class AuthModule {}
