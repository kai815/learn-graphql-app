import {
  CanActivate,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from '@/components/users/user.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: GqlExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const idToken = req.headers.authorization as
      | string
      | undefined;
    try {
      const user = await this.userService.authorizeUser(idToken);
      req['user'] = user;
      return true; // trueにしないとthrowされてしまう?のでtrue
    } catch (error) {
      throw new UnauthorizedException('認証情報が正しくありません');
    }
  }
}
