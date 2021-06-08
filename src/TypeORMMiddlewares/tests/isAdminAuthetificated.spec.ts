import { NextFunction, Request, Response } from 'express';
import RequestError from '../../Classes/Errors/RequestError';
import { ERROR_MESSAGES, STATUS_CODES } from '../../Constants';
import { LOCATIONS } from '../constants';
import isAdminAuthetificated from '../isAdminAuthentification';

describe(LOCATIONS.IS_ADMIN_AUTHENFICATION, () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    next = jest.fn();
  });

  test('User is admin', () => {
    mockRequest = {
      user: {
        is_admin: true,
      },
    };
    isAdminAuthetificated(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );
    expect(next).toBeCalledWith();
  });

  test('User is not admin', () => {
    mockRequest = {
      user: {
        is_admin: false,
      },
    };
    isAdminAuthetificated(
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
});
