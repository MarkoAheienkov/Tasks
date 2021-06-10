import { NextFunction, Request, Response } from 'express';
import { signIn } from '../';

const repository = {
  findOne() {
    return new Promise((res, rej) => {
      res({
        email: 'user@user.com',
      });
    });
  },
};

const connect = {
  getRepository() {
    return repository;
  },
};

jest.mock('../../../Connect/typeORMConnect', () => {
  return {
    getConnect() {
      return new Promise((res, rej) => {
        res(connect);
      });
    },
  };
});

jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn(),
  };
});

describe('POST /auth/sign-in', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const next: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
      cookie: jest.fn(),
    };
  });

  test('Sign in with email', async () => {
    mockRequest = {
      body: {
        email: 'user@user.com',
      },
    };
    await signIn(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );
    expect(mockResponse.cookie).toBeCalledTimes(1);
    expect(mockResponse.json).toBeCalledTimes(1);
    expect(mockResponse.status).toBeCalledTimes(1);
  });

  test('Sign in without email', async () => {
    await signIn(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );
    expect(next).toBeCalledTimes(1);
  });
});
