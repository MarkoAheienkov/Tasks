import { NextFunction, Request, Response } from 'express';
import RequestError from '../Classes/Errors/RequestError';
import PostDBConnector from '../Classes/PostDBConnector/PostSQLDBConnector';
import { ERROR_MESSAGES, STATUS_CODES } from '../Constants';
import constructLocationError from '../Helpers/constructLocationError';
import isRequestError from '../Helpers/isRequestError';
import PostRepository from '../Repositories/Post';
import { LOCATIONS } from './constants';

const isPostExist = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const postDBConnector = new PostDBConnector();
    const { id } = req.params;
    const post = await PostRepository.getById(postDBConnector, id);
    if (!post) {
      const error = new RequestError(
        ERROR_MESSAGES.NO_SUCH_POST,
        STATUS_CODES.NOT_FOUND,
      );
      throw error;
    }
    next();
  } catch (err) {
    if (isRequestError(err)) {
      next(err);
    } else {
      const locationError = constructLocationError(
        err,
        LOCATIONS.IS_POST_EXIST,
      );
      next(locationError);
    }
  }
};

export default isPostExist;
