
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class ConfigService {
  constructor() {
    console.info('Started in', this.nodeEnv, 'mode');
  }

  public get(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    return +this.get(key);
  }

  public getBoolean(key: string): boolean {
    return ['true', '1'].includes(this.get(key)?.toLowerCase());
  }

  public get nodeEnv(): string { return this.get('NODE_ENV') }

  public get port(): number { return this.getNumber('PORT') || 3000 }

  public get host(): string { return this.get('HOST') || '0.0.0.0' }


  public get typeOrmConfig(): TypeOrmModuleOptions {
    let entities = [__dirname + '/../../modules/**/*.entity{.ts,.js}'];
    let migrations = [__dirname + '/../../migrations/*{.ts,.js}'];

    if ((<any>module).hot) {
      const entityContext = (<any>require).context(
        './../../modules',
        true,
        /\.entity\.ts$/,
      );
      entities = entityContext.keys().map((id) => {
        const entityModule = entityContext(id);
        const [entity] = Object.values(entityModule);
        return entity;
      });
      const migrationContext = (<any>require).context(
        './../../migrations',
        false,
        /\.ts$/,
      );
      migrations = migrationContext.keys().map((id) => {
        const migrationModule = migrationContext(id);
        const [migration] = Object.values(migrationModule);
        return migration;
      });
    }
    const config = {
      entities,
      migrations,
      keepConnectionAlive: true,
      type: 'sqlite',
      database: this.get('DB_NAME') || './db/db.sql',
      logging: this.nodeEnv === 'development',
      migrationsRun: true,
      synchronize:
        this.nodeEnv === 'production' ? false : this.getBoolean('DB_SYNC'),
    };
    return <TypeOrmModuleOptions>config;
  }

}
