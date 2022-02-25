export const PORT = process.env.PORT || 3000;
export const HOST = '0.0.0.0';
export const { NODE_ENV } = process.env;
export const { LOG_LEVEL } = process.env;

export const { JWT_SECRET_KEY } = process.env;
export const AUTH_MODE = process.env.AUTH_MODE === 'true';

export const { POSTGRES_HOST } = process.env;
export const { POSTGRES_PORT } = process.env;
export const { POSTGRES_USER } = process.env;
export const { POSTGRES_PASSWORD } = process.env;
export const { POSTGRES_DB } = process.env;

export default () => ({
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  LOG_LEVEL: process.env.LOG_LEVEL,

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',

  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  STATIC_FILES_DIR: process.env.STATIC_FILES_DIR || './',
});
