import dotenv from 'dotenv'

dotenv.config()

export enum ENV {
  PORT = 'PORT',
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',
  DB_USER = 'DB_USER',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_NAME = 'DB_NAME',
}

function getEnv(key: keyof typeof ENV, required = true): string {
  // eslint-disable-next-line no-undef
  const value = process.env[key]

  if (required && !value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }

  return value!
}

export const config = {
  db: {
    host: getEnv(ENV.DB_HOST),
    port: Number(getEnv(ENV.DB_PORT)),
    user: getEnv(ENV.DB_USER),
    password: getEnv(ENV.DB_PASSWORD),
    database: getEnv(ENV.DB_NAME),
  },
  server: {
    port: Number(getEnv(ENV.PORT) ?? 4000),
  },
}
