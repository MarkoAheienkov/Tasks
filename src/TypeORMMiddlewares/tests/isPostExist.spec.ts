import { NextFunction, Request, Response } from 'express';
import RequestError from '../../Classes/Errors/RequestError';
import { ERROR_MESSAGES, STATUS_CODES } from '../../Constants';
import isPostExist from '../isPostExist';
import { LOCATIONS } from '../constants';

const repository = {
  findOne({ where }: any) {
    const { post_id } = where[0];
    return new Promise((res, rej) => {
      if (post_id === '1') {
        res({
          post_id: '1',
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

describe(LOCATIONS.IS_POST_EXIST, () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    next = jest.fn();
  });

  test('Post with id exist', async () => {
    mockRequest = {
      params: {
        id: '1',
      },
    };
    await isPostExist(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );
    expect(next).toBeCalledWith();
  });
  test('Post with id doesnt exist', async () => {
    mockRequest = {
      params: {
        id: '2',
      },
    };
    await isPostExist(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );
    const error = new RequestError(
      ERROR_MESSAGES.NO_SUCH_POST,
      STATUS_CODES.NOT_FOUND,
    );
    expect(next).toBeCalledWith(error);
  });
});
