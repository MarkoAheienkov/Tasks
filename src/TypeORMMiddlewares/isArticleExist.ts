import { NextFunction, Request, Response } from 'express';
import RequestError from '../Classes/Errors/RequestError';
import { ERROR_MESSAGES, STATUS_CODES } from '../Constants';
import constructLocationError from '../Helpers/constructLocationError';
import isRequestError from '../Helpers/isRequestError';
import { LOCATIONS } from './constants';
import typeORMConnect from '../Connect/typeORMConnect';
import Articles from '../Entities/article';

const isArticleExist = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const connection = await typeORMConnect.getConnect();
    const articleRepository = connection.getRepository(Articles);
    const article = await articleRepository.findOne({
      where: [{ article_id: id }],
    });
    if (!article) {
      const error = new RequestError(
        ERROR_MESSAGES.NO_SUCH_ARTICLE,
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
        LOCATIONS.IS_ARTICLE_EXIST,
      );
      next(locationError);
    }
  }
};

export default isArticleExist;
