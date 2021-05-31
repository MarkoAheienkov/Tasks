import { NextFunction, Request, Response } from 'express';
import ArticleDBConnector from '../Classes/ArticleDBConnector/ArticleMongoDBConnector';
import RequestError from '../Classes/Errors/RequestError';
import { ERROR_MESSAGES, STATUS_CODES } from '../Constants';
import constructLocationError from '../Helpers/constructLocationError';
import getUser from '../Helpers/getUserFromQuery';
import isRequestError from '../Helpers/isRequestError';
import AdminRepository from '../Repositories/Admin';
import ArticleRepository from '../Repositories/Article';
import { LOCATIONS } from './constants';

const isArticleCreator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const articleDBConnector = new ArticleDBConnector();
    const { id } = req.params;
    const { auth } = req.query;
    const article = (await ArticleRepository.getById(
      articleDBConnector,
      id,
    )) as ArticleRepository;
    const user = await getUser(auth as string);
    if (!(user instanceof AdminRepository) || article.creator === user.id) {
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
