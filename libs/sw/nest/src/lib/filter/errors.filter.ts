import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { SwResourceService } from '../resource/services/sw-resource.service';
import { SwResponseMessageType } from '../resource/enums';
import { SwLogService } from '../log';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  constructor(
    private swLogService: SwLogService,
    private swResourceService: SwResourceService
  ) {}

  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    this.swLogService.error(error);
    if (status === HttpStatus.UNAUTHORIZED) {
      response.status(status).json(this.swResourceService.wrapStatusData({}, false, SwResponseMessageType.TOKEN_HAS_EXPIRED_PLEASE_LOGIN_AGAIN));
    } else {
      response.status(status).json(this.swResourceService.wrapStatusData({}, false, SwResponseMessageType.SYSTEM_ERROR));
    }
  }
}
