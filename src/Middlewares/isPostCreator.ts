import { NextFunction, Request, Response } from 'express';
import RequestError from '../Classes/Errors/RequestError';
import PostDBConnector from '../Classes/PostDBConnector/PostMongoDBConnector';
import { ERROR_MESSAGES, STATUS_CODES } from '../Constants';
import constructLocationError from '../Helpers/constructLocationError';
import getUser from '../Helpers/getUserFromQuery';
import isRequestError from '../Helpers/isRequestError';
import AdminRepository from '../Repositories/Admin';
import PostRepository from '../Repositories/Post';
import { LOCATIONS } from './constants';

const isPostCreator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const postDBConnector = new PostDBConnector();
    const { id } = req.params;
    const { auth } = req.query;
    const post = (await PostRepository.getById(
      postDBConnector,
      id,
    )) as PostRepository;
    const user = await getUser(auth as string);
    if (!(user instanceof AdminRepository) || post.creator === user.id) {
      const error = new RequestError(
        ERROR_MESSAGES.AUTHORIZATION_PROBLEM,
        STATUS_CODES.AUTHORIZATION_PROBLEM,
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
        LOCATIONS.IS_POST_CREATOR,
      );
      next(locationError);
    }
  }
};

export default isPostCreator;
