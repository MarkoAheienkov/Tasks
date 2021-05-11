import { NextFunction, Request, Response } from 'express';
import ArticleFileDBConnector from '../Classes/ArticleDBConnector/ArticleFileDBConnector';
import RequestError from '../Classes/Errors/RequestError';
import getUser from '../Helpers/getUserFromQuery';
import Admin from '../Models/Admin';
import Article from '../Models/Article';

const articleFileDBConnector = new ArticleFileDBConnector();

const isArticleCreator = async (
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
