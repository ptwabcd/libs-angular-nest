import { Dialect } from 'sequelize';

export interface SwConfig {
  isHttps: boolean;
  clientHost: string;
  serverHost: string;
  serverPort: number;
  accessControlAllowOrigin: string;
  accessControlAllowMethods: string;
  accessControlAllowHeaders: string;
  credentials: boolean;
  dbDialect: Dialect;
  dbName: string;
  dbUserName: string;
  dbPassword: string;
  dbPort: number;
  dbHost: string;
  isDebugMode: boolean;
  isCreateInitData: boolean;
  isSyncData: boolean;
  assetsRootPath: string;
  timeZone: string;
}
