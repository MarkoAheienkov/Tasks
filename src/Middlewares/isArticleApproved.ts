import { NextFunction, Request, Response } from 'express';
import ArticleFileDBConnector from '../Classes/ArticleDBConnector/ArticleFileDBConnector';
import RequestError from '../Classes/Errors/RequestError';
import Article from '../Models/Article';

const articleFileDBConnector = new ArticleFileDBConnector();

const isArticleExist = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const article = (await Article.getById(
      articleFileDBConnector,
      id,
    )) as Article;
    if (article.approved) {
      const error = new RequestError('Article is already approved', 409);
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default isArticleExist;
