import * as dotenv from 'dotenv'
dotenv.config()

declare var process : {
    env: {
      DB_HOST: string,
      DB_USER : string,
      DB_PASSWORD : string,
      DB_NAME: string,
      JWT_SECRET:string
    }
  }

  export const CONFIG = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '123',
    database: process.env.DB_NAME || 'nest',
    secret: process.env.JWT_SECRET
  }