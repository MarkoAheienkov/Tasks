import { NextFunction, Request, Response } from 'express';
import RequestError from '../Classes/Errors/RequestError';
import { ERROR_MESSAGES, STATUS_CODES } from '../Constants';
import constructLocationError from '../Helpers/constructLocationError';
import isRequestError from '../Helpers/isRequestError';
import { LOCATIONS } from './constants';
import typeORMConnect from '../Connect/typeORMConnect';
import Articles from '../Entities/article';
import Users from '../Entities/user';

const isArticleCreator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const connection = await typeORMConnect.getConnect();
    const { id } = req.params;
    const articleRepository = connection.getRepository(Articles);
    const user = req.user as Users;
    const article = await articleRepository.findOne({
      where: [{ article_id: id, creator: user }],
    });
    if (!article && !user.is_admin) {
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
        LOCATIONS.IS_ARTICLE_CREATOR,
      );
      next(locationError);
    }
  }
};

export default isArticleCreator;
