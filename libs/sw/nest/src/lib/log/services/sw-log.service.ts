import { LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import { SwConfigService } from '../../config/services/sw-config.service';
import { SwDate } from 'sw-common';

export class SwLogService implements LoggerService {

  swDate = new SwDate();
  swConfigService = new SwConfigService().getConfig();

  logfileName = `${this.swDate.getYear()}-${this.swDate.getMonth()}-${this.swDate.getDay()}.txt`;

  debug(message: any, context?: string): any {
    this.logProcess('debug', message, '\x1b[35m');
  }

  error(message: any, trace?: string, context?: string): any {
    this.logProcess('error', message, '\x1b[31m');
  }

  log(message: any, context?: string): any {
    this.logProcess('info', message, '\x1b[32m');
  }

  verbose(message: any, context?: string): any {
    this.logProcess('verbose', message, '\x1b[36m');
  }

  warn(message: any, context?: string): any {
    this.logProcess('warn', message, '\x1b[33m');
  }

  logProcess(logType: 'info' | 'error' | 'debug' | 'warn' | 'verbose', message, color: string) {
    if (!fs.existsSync(`log/${logType}`)) {
      fs.mkdirSync(`log/${logType}`, { recursive: true });
    }
    fs.appendFileSync(`log/${logType}/${this.logfileName}`, `${message}\n`);
    if (this.swConfigService.isDebugMode) {
      console.log(color, `[${this.swDate.getDate()}]`);
      console.log(color, message);
    }
  }

}
