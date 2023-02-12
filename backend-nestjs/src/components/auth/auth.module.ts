import { Module } from '@nestjs/common';
import {AuthResolver} from '@/components/auth/auth.resolver'
import {AuthService} from '@/components/auth/auth.service'
import {UserService} from "@/components/users/user.service";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  providers:[AuthResolver,UserService,AuthService]
})
export class AuthModule {}
