import { NextFunction, Request, Response } from 'express';
import RequestError from '../Classes/Errors/RequestError';
import { ERROR_MESSAGES, STATUS_CODES } from '../Constants';
import constructLocationError from '../Helpers/constructLocationError';
import isRequestError from '../Helpers/isRequestError';
import { LOCATIONS } from './constants';
import typeORMConnect from '../Connect/typeORMConnect';
import Users from '../Entities/user';
import Posts from '../Entities/post';

const isPostCreator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const connection = await typeORMConnect.getConnect();
    const user = req.user as Users;
    const postRepository = connection.getRepository(Posts);
    const post = await postRepository.findOne({
      where: [{ post_id: id, creator: user }],
    });
    if (!post && !user.is_admin) {
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
