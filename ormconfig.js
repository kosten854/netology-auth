/* eslint-disable @typescript-eslint/no-var-requires */
const process = require('process'); 

const env = process.env.NODE_ENV||'development';  
const database = process.env.DB_NAME||'./db/db.sql'; 
const synchronize = ['true','1'].includes(process.env.DB_SYNC); 
  

module.exports = {
  type: 'sqlite',  
  database,
  synchronize: env === 'production' ? false : synchronize,
  dropSchema: false,
  logging: true,
  entities: ['src/modules/**/*.entity{.ts,.js}'],
  migrations: ['migrations/**/*.ts'], 
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'migrations', 
  },
};