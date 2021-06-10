import { NextFunction, Request, Response } from 'express';
import RequestError from '../Classes/Errors/RequestError';
import { ERROR_MESSAGES, STATUS_CODES } from '../Constants';
import constructLocationError from '../Helpers/constructLocationError';
import isRequestError from '../Helpers/isRequestError';
import { LOCATIONS } from './constants';
import typeORMConnect from '../Connect/typeORMConnect';
import Posts from '../Entities/post';

const isPostExist = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const connection = await typeORMConnect.getConnect();
    const postRepository = connection.getRepository(Posts);
    const post = await postRepository.findOne({ where: [{ post_id: id }] });
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
