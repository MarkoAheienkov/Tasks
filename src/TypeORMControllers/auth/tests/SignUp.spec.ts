import { NextFunction, Request, Response } from 'express';
import { signUp } from '../';

const repository = {
  save() {
    return new Promise((res, rej) => {
      res(true);
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

jest.mock('bcryptjs', () => {
  return {
    hash: jest.fn(),
  };
});

describe('POST /auth/sign-up', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
      cookie: jest.fn(),
    };
    next = jest.fn();
  });

  test('Sign up with all fields', async () => {
    mockRequest = {
      body: {
        email: 'user@user.com',
        password: 'user_A2',
        username: 'user',
      },
    };
    await signUp(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );
    expect(mockResponse.json).toBeCalledTimes(1);
    expect(mockResponse.status).toBeCalledTimes(1);
  });

  test('Sign up without fields', async () => {
    await signUp(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );
    expect(next).toBeCalledTimes(1);
  });
});
