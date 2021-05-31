import { NextFunction, Request, Response } from 'express';
import ArticleDBConnector from '../Classes/ArticleDBConnector/ArticleMongoDBConnector';
import RequestError from '../Classes/Errors/RequestError';
import getUser from '../Helpers/getUserFromQuery';
import Admin from '../Models/Admin';
import Article from '../Models/Article';

const isArticleCreator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const articleDBConnector = new ArticleDBConnector();
    const { id } = req.params;
    const article = (await Article.getById(articleDBConnector, id)) as Article;
    const user = await getUser(req);
    if (!(user instanceof Admin) || article.creator === user.id) {
      const error = new RequestError('Authorization Problem', 403);
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default isArticleCreator;
