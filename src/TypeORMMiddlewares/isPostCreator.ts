import { NextFunction, Request, Response } from 'express';
import RequestError from '../Classes/Errors/RequestError';
import { ERROR_MESSAGES, STATUS_CODES } from '../Constants';
import constructLocationError from '../Helpers/constructLocationError';
import getUser from '../Helpers/getUserFromQueryWithTypeORM';
import isRequestError from '../Helpers/isRequestError';
import { LOCATIONS } from './constants';
import typeORMConnect from '../Connect/typeORMConnect';
import Articles from '../Entities/article';

const isPostCreator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { auth } = req.query;
    const connection = await typeORMConnect.getConnect();
    const user = await getUser(auth as string);
    const articleRepository = connection.getRepository(Articles);
    const article = await articleRepository.findOne({
      where: [{ article_id: id }],
    });
    if (!article || !user || article.creator !== user.user_id) {
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
