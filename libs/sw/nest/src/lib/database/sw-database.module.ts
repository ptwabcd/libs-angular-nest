import { DynamicModule, Global, Module } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeStorage, Umzug } from 'umzug';
import { SwConfigService } from '../config';
import { SwLogService } from '../log';

@Global()
@Module({})
export class SwDatabaseModule {
  static forRoot(entities = []): DynamicModule {
    // tslint:disable-next-line:no-shadowed-variable
    const databaseProviders = (entities) => [
      {
        provide: 'SEQUELIZE',
        useFactory: async () => {
          const config = new SwConfigService().getConfig();
          const sequelize = new Sequelize({
            dialect: config.dbDialect,
            host: config.dbHost,
            port: config.dbPort,
            username: config.dbUserName,
            password: config.dbPassword,
            database: config.dbName,
            logging: msg => new SwLogService().debug(msg),
            dialectOptions: {
              connectTimeout: 30000,
              useUTC: false,
              dateStrings: true,
              typeCast: function (field, next) {
                if (field.type === 'DATETIME') {
                  return field.string();
                }
                return next();
              },
            },
            timezone: config.timeZone,
          });
          const umzug = new Umzug({
            migrations: {
              glob: ['../../core/migrations/*.js', { cwd: __dirname }],
            },
            context: sequelize.getQueryInterface(),
            storage: new SequelizeStorage({ sequelize }),
            logger: console,
          });
          let tables = [];
          if (config.dbDialect === 'postgres') {
            tables = (await sequelize.query(`SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'`))[0];
          } else {
            tables = await sequelize.showAllSchemas({});
          }
          sequelize.addModels(entities);
          await sequelize.sync({alter: config.isSyncData});
          if (tables.length > 0) {
            await umzug.up();
          }
          return sequelize;
        }
      },
    ];
    return {
      module: SwDatabaseModule,
      providers: [...databaseProviders(entities)],
      exports: [...databaseProviders(entities)],
    };
  }
}
