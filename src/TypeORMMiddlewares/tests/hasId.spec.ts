import { NextFunction, Request, Response } from 'express';
import RequestError from '../../Classes/Errors/RequestError';
import { ERROR_MESSAGES, STATUS_CODES } from '../../Constants';
import { LOCATIONS } from '../constants';
import hasId from '../hasId';

describe(LOCATIONS.HAS_ID, () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let next: NextFunction;
  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    next = jest.fn();
  });

  test('Request has id', () => {
    mockRequest = {
      params: {
        id: '1',
      },
    };

    hasId(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );

    expect(next).toBeCalledWith();
  });

  test('Request without id', () => {
    mockRequest = {
      params: {},
    };

    hasId(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );

    const error = new RequestError(
      ERROR_MESSAGES.ID_IS_REQUIRED,
      STATUS_CODES.VALIDATION_ERROR,
    );

    expect(next).toBeCalledWith(error);
  });
});
