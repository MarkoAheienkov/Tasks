import { NextFunction, Request, Response } from 'express';
import ArticleDBConnector from '../Classes/ArticleDBConnector/ArticleMongoDBConnector';
import RequestError from '../Classes/Errors/RequestError';
import Article from '../Models/Article';

const isArticleExist = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const articleDBConnector = new ArticleDBConnector();
    const { id } = req.params;
    const article = (await Article.getById(articleDBConnector, id)) as Article;
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
