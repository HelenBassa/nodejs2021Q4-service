import { FastifyReply, FastifyRequest } from 'fastify';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../common/config';
import { PostLoginReq } from './login.types';
import loginService from "./login.service";
import {
  APP_URL,
  AUTH_TYPE,
  UNAUTHORIZED,
  HTTP_CODES,
  WRONG_LOGIN_PASS,
} from '../../constants';

const SECRET_KEY = `${  JWT_SECRET_KEY}`;

const postLogin = async (request: PostLoginReq, reply: FastifyReply) => {
  const { login, password } = request.body;

  const token = await loginService.signToken(login, password);
  if (!token) {
    reply.status(HTTP_CODES.FORBIDDEN).send(WRONG_LOGIN_PASS);
  } else {
    reply.status(HTTP_CODES.OK).send({ token });
  }
};

const checkToken = async (request: FastifyRequest, reply: FastifyReply) => {
  if (
    !(
      request.url === APP_URL.ROOT ||
      request.url === APP_URL.DOC ||
      request.url === APP_URL.LOGIN
    )
  ) {
    const authHeader = request.headers.authorization;

    if (authHeader !== undefined) {
      const tokenStr = request.headers.authorization;
      if (tokenStr) {
        const [type, token] = tokenStr.split(' ');

        if (type !== AUTH_TYPE) {
          reply.status(HTTP_CODES.UNAUTHORIZED).send(UNAUTHORIZED);
        } else {
          try {
            jwt.verify(token, SECRET_KEY);
          } catch (e) {
            reply.status(HTTP_CODES.UNAUTHORIZED).send(UNAUTHORIZED);
          }
        }
      } else {
        reply.status(HTTP_CODES.UNAUTHORIZED).send(UNAUTHORIZED);
      }
    } else {
      reply.status(HTTP_CODES.UNAUTHORIZED).send(UNAUTHORIZED);
    }
  }
};

export default {
  postLogin,
  checkToken,
};
