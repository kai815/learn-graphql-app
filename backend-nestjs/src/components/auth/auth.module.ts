import { Module } from '@nestjs/common';
import {AuthResolver} from '@/components/auth/auth.resolver'
import {UserService} from "@/components/users/user.service";

@Module({
  providers:[AuthResolver,UserService]
})
export class AuthModule {}
