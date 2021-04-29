import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp()?.getRequest();
    console.log('--- guard: ', JSON.stringify(request?.headers));
    return true;
  }
}
