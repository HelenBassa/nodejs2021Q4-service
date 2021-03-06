import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
  LogLevel,
} from 'fastify';
import pino from 'pino';
import { HTTP_CODES } from './constants';
import { LOG_LEVEL } from './config';

const transport = pino.transport({
  targets: [
    {
      target: 'pino/file',
      level: 'error',
      options: {
        destination: './logs/error.log',
        mkdir: true,
        translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
    {
      target: 'pino/file',
      level: 'trace',
      options: {
        destination: './logs/all.log',
        mkdir: true,
        translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
    {
      target: 'pino-pretty',
      level: 'trace',
      options: {
        destination: 1,
        translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
  ],
});

export const LOG_CONFIG: FastifyServerOptions = {
  logger: pino(
    {
      level: LOG_LEVEL,
      serializers: {
        res(reply: FastifyReply) {
          return {
            statusCode: reply.statusCode,
          };
        },
        req(request: FastifyRequest) {
          return {
            method: request.method,
            url: request.url,
            path: request.routerPath,
            parameters: request.params,
            query: request.query,
          };
        },
      },
    },
    transport,
  ),
};

export const preHandlerLog = (request: FastifyRequest) => {
  if (request.body) {
    request.log.info({ body: request.body }, 'parsed body');
  }
};

export const onResponseLog = (
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  let logLevel: LogLevel;
  if (
    reply.statusCode >= HTTP_CODES.OK &&
    reply.statusCode < HTTP_CODES.BAD_REQUEST
  ) {
    logLevel = 'info';
  } else if (
    reply.statusCode >= HTTP_CODES.BAD_REQUEST &&
    reply.statusCode < HTTP_CODES.INTERNAL_SERVER_ERROR
  ) {
    logLevel = 'warn';
  } else if (reply.statusCode >= HTTP_CODES.INTERNAL_SERVER_ERROR) {
    logLevel = 'error';
  } else {
    logLevel = 'fatal';
  }

  reply.log[logLevel]({ statusCode: reply.statusCode });
};

export const fatalLog = (app: FastifyInstance) => (error: unknown) => {
  app.log.fatal(error);
  setTimeout(() => {
    process.exit(1);
  }, 1000);
};
