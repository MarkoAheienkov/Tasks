import { logOut } from '../';
import { NextFunction, Request, Response } from 'express';

describe('POST /auth/log-out', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<any>;
  const next: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      clearCookie: jest.fn(),
    };
  });
  test('log-out', async () => {
    await logOut(mockRequest as Request, mockResponse as Response, next);
    expect(mockResponse.json).toBeCalledTimes(1);
    expect(mockResponse.clearCookie).toBeCalledTimes(1);
  });
});
