import { AuthGuard } from '@nestjs/passport'
import { AuthService } from '../auth.service'
import { ExecutionContext, Inject, Injectable } from '@nestjs/common'

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  @Inject(AuthService) private authService: AuthService

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest()

    const payload = await this.authService.verifyToken(
      request.headers.authorization,
    )

    if (payload.isRefresh) {
      return false
    }

    return super.canActivate(context)
  }
}