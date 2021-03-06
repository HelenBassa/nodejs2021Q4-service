import { join } from 'path';

const NAME = 'admin';
const LOGIN = 'admin';
const PASSWORD = 'admin';
const SALT = 10;

const AUTH_TYPE = 'Bearer';

const APP_URL = {
  ROOT: '/',
  DOC: '/doc',
  LOGIN: '/login',
  FILE: '/file',
};

const UPLOAD_DIR = join(__dirname, '../../uploads');

const HTTP_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export {
  NAME,
  LOGIN,
  PASSWORD,
  SALT,
  AUTH_TYPE,
  APP_URL,
  HTTP_CODES,
  UPLOAD_DIR,
};
