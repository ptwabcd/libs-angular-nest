import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { SwConfig } from '../models/sw-config';
import { Dialect } from 'sequelize';

@Injectable()
export class SwConfigService {
  private readonly envConfig: { [key: string]: string };
  config: SwConfig;

  constructor() {
    this.envConfig = dotenv.parse(fs.readFileSync(`${process.env.NODE_ENV}.env`));
    this.config = this.getConfig();
  }

  getConfig(): SwConfig {
    const http = this.envConfig['IS_HTTPS'] === 'true' ? 'https' : 'http';
    const ip = this.envConfig['IP'];
    const clientIp = this.envConfig['CLIENT_IP'] ? this.envConfig['CLIENT_IP'] : this.envConfig['IP'];
    const serverPort = Number(this.envConfig['SERVER_POET']);
    return {
      isHttps: this.envConfig['IS_HTTPS'] === 'true',
      clientHost: `${http}://${clientIp}:${this.envConfig['CLIENT_POET']}`,
      serverHost: `${http}://${ip}:${serverPort}`,
      serverPort,
      accessControlAllowOrigin: this.envConfig['ACCESS_CONTROL_ALLOW_ORIGIN'],
      accessControlAllowMethods: this.envConfig['ACCESS_CONTROL_ALLOW_METHODS'],
      accessControlAllowHeaders: this.envConfig['ACCESS_CONTROL_ALLOW_HEADERS'],
      credentials: this.envConfig['CREDENTIALS'] === 'true',
      dbDialect: (this.envConfig['DB_DIALECT'] ? this.envConfig['DB_DIALECT'] : 'mysql') as Dialect,
      dbName: this.envConfig['DB_NAME'],
      dbUserName: this.envConfig['DB_USER_NAME'],
      dbPassword: this.envConfig['DB_PASSWORD'],
      dbPort: Number(this.envConfig['DB_PORT']),
      dbHost: this.envConfig['DB_HOST'],
      isDebugMode: this.envConfig['IS_DEBUG_MODE'] === 'true',
      isCreateInitData: this.envConfig['IS_CREATE_INIT_DATA'] === 'true',
      isSyncData: this.envConfig['IS_SYNC_DATA'] === 'true',
      assetsRootPath: this.envConfig['ASSETS_ROOT_PATH'],
      timeZone: this.envConfig['TIME_ZONE'] ? this.envConfig['TIME_ZONE'] : '+08:00'
    };
  }
}
