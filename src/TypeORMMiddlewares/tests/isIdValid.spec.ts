import { NextFunction, Request, Response } from 'express';
import RequestError from '../../Classes/Errors/RequestError';
import { ERROR_MESSAGES, STATUS_CODES } from '../../Constants';
import { LOCATIONS } from '../constants';
import isValidId from '../isValidId';

describe(LOCATIONS.IS_VALID_ID, () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let next: NextFunction;
  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    next = jest.fn();
  });

  test('Request with valid id', () => {
    mockRequest = {
      params: {
        id: '1',
      },
    };

    isValidId(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );

    expect(next).toBeCalledWith();
  });

  test('Request with not valid id', () => {
    mockRequest = {
      params: {
        id: 'Blablablba',
      },
    };

    isValidId(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );

    const error = new RequestError(
      ERROR_MESSAGES.ID_SI_NOT_VALID,
      STATUS_CODES.VALIDATION_ERROR,
    );

    expect(next).toBeCalledWith(error);
  });
});
