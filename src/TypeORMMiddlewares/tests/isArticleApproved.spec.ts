import { NextFunction, Request, Response } from 'express';
import RequestError from '../../Classes/Errors/RequestError';
import { ERROR_MESSAGES, STATUS_CODES } from '../../Constants';
import isArticleApproved from '../isArticleApproved';
import { LOCATIONS } from '../constants';

const repository = {
  findOne({ where }: any) {
    const { article_id } = where[0];
    return new Promise((res, rej) => {
      if (article_id === '1') {
        res({
          approved: true,
        });
      } else {
        res({
          approved: false,
        });
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

describe(LOCATIONS.IS_ARTICLE_APPROVED, () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let next: NextFunction;
  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    next = jest.fn();
  });
  test('Article is approved', async () => {
    mockRequest = {
      params: {
        id: '1',
      },
    };
    await isArticleApproved(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );
    const error = new RequestError(
      ERROR_MESSAGES.ARTICLE_ALREADY_APPROVED,
      STATUS_CODES.ARTICLE_ALREADY_APPROVED,
    );
    expect(next).toBeCalledWith(error);
  });
  test('Article is not approved', async () => {
    mockRequest = {
      params: {
        id: '2',
      },
    };
    await isArticleApproved(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );
    expect(next).toBeCalledWith();
  });
});
