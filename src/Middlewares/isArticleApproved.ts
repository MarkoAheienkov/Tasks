import { NextFunction, Request, Response } from 'express';
import ArticleDBConnector from '../Classes/ArticleDBConnector/ArticleSQLDBConnector';
import RequestError from '../Classes/Errors/RequestError';
import { ERROR_MESSAGES, STATUS_CODES } from '../Constants';
import constructLocationError from '../Helpers/constructLocationError';
import isRequestError from '../Helpers/isRequestError';
import ArticleRepository from '../Repositories/Article';
import { LOCATIONS } from './constants';

const isArticleApproved = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const articleDBConnector = new ArticleDBConnector();
    const { id } = req.params;
    const article = (await ArticleRepository.getById(
      articleDBConnector,
      id,
    )) as ArticleRepository;
    if (article.approved) {
      const error = new RequestError(
        ERROR_MESSAGES.ARTICLE_ALREADY_APPROVED,
        STATUS_CODES.ARTICLE_ALREADY_APPROVED,
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
        LOCATIONS.IS_ARTICLE_APPROVED,
      );
      next(locationError);
    }
  }
};

export default isArticleApproved;
