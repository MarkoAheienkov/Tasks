import { NextFunction, Request, Response } from 'express';
import RequestError from '../../Classes/Errors/RequestError';
import { ERROR_MESSAGES, STATUS_CODES } from '../../Constants';
import isPostCreator from '../isPostCreator';
import { LOCATIONS } from '../constants';

const repository = {
  findOne({ where }: any) {
    const { creator } = where[0];
    return new Promise((res, rej) => {
      if (creator.user_id === '1') {
        res({
          creator,
        });
      } else {
        res(null);
      }
    });
  },
};

const connect = {
  getRepository() {
    return repository;
  },
};

jest.mock('../../Connect/typeORMConnect', () => {
  return {
    getConnect() {
      return new Promise((res, rej) => {
        res(connect);
      });
    },
  };
});

describe(LOCATIONS.IS_POST_CREATOR, () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    next = jest.fn();
  });

  test('User is post creator', async () => {
    mockRequest = {
      user: {
        user_id: '1',
        is_admin: false,
      },
      params: {
        id: '1',
      },
    };
    await isPostCreator(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );
    expect(next).toBeCalledWith();
  });
  test('User is not post creator and he is not admin', async () => {
    mockRequest = {
      user: {
        user_id: '2',
        is_admin: false,
      },
      params: {
        id: '1',
      },
    };
    await isPostCreator(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );
    const error = new RequestError(
      ERROR_MESSAGES.AUTHORIZATION_PROBLEM,
      STATUS_CODES.AUTHORIZATION_PROBLEM,
    );
    expect(next).toBeCalledWith(error);
  });
  test('User is not post creator but he is admin', async () => {
    mockRequest = {
      user: {
        user_id: '2',
        is_admin: true,
      },
      params: {
        id: '1',
      },
    };
    await isPostCreator(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );
    expect(next).toBeCalledWith();
  });
  test('User is post creator and he is admin', async () => {
    mockRequest = {
      user: {
        user_id: '1',
        is_admin: true,
      },
      params: {
        id: '1',
      },
    };
    await isPostCreator(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );
    expect(next).toBeCalledWith();
  });
});
