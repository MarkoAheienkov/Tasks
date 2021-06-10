import { NextFunction, Request, Response } from 'express';
import RequestError from '../../Classes/Errors/RequestError';
import { ERROR_MESSAGES, STATUS_CODES } from '../../Constants';
import isArticleExist from '../isArticleExist';
import { LOCATIONS } from '../constants';

const repository = {
  findOne({ where }: any) {
    const { article_id } = where[0];
    return new Promise((res, rej) => {
      if (article_id === '1') {
        res({
          article_id: '1',
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

describe(LOCATIONS.IS_ARTICLE_EXIST, () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    next = jest.fn();
  });

  test('Article with id exist', async () => {
    mockRequest = {
      params: {
        id: '1',
      },
    };
    await isArticleExist(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );
    expect(next).toBeCalledWith();
  });
  test('Article with id doesnt exist', async () => {
    mockRequest = {
      params: {
        id: '2',
      },
    };
    await isArticleExist(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );
    const error = new RequestError(
      ERROR_MESSAGES.NO_SUCH_ARTICLE,
      STATUS_CODES.NOT_FOUND,
    );
    expect(next).toBeCalledWith(error);
  });
});
