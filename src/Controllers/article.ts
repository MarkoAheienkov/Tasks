import { Response, NextFunction, Request } from 'express';
// import ArticleFileDBConnector from '../Classes/ArticleDBConnector/ArticleFileDBConnector';
import ArticleDBConnector from '../Classes/ArticleDBConnector/ArticleSQLDBConnector';
import getUser from '../Helpers/getUserFromQuery';
import Admin from '../Models/Admin';
import Article from '../Models/Article';
import User from '../Models/User';

export const getArticles = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const articleDBConnector = new ArticleDBConnector();
    const articleModels = await Article.getAllApproved(articleDBConnector);
    const articles = articleModels.map(article => article.toObject());
    return res.json({
      articles,
    });
  } catch (err) {
    return next(err);
  }
};

export const getNotApprovedArticles = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const articleDBConnector = new ArticleDBConnector();
    const articleModels = await Article.getAllNotApproved(articleDBConnector);
    const articles = articleModels.map(article => article.toObject());
    return res.json({
      articles,
    });
  } catch (err) {
    return next(err);
  }
};

export const getArticleById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const articleDBConnector = new ArticleDBConnector();
    const { id } = req.params;
    const article = (await Article.getById(articleDBConnector, id)) as Article;
    return res.json(article.toObject());
  } catch (err) {
    return next(err);
  }
};

export const getArticlesUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const articleDBConnector = new ArticleDBConnector();
    const user = (await getUser(req)) as User;
    const articleModels = await Article.getUserArticles(
      articleDBConnector,
      user.id,
    );
    const articles = articleModels.map(model => model.toObject());
    return res.json({
      articles,
    });
  } catch (err) {
    return next(err);
  }
};

export const postArticle = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const articleDBConnector = new ArticleDBConnector();
    const { title, cover, sections } = req.body;
    const user = (await getUser(req)) as User;
    const article = new Article(
      title,
      cover,
      user.id,
      sections,
      articleDBConnector,
    );
    if (user instanceof Admin) {
      article.approved = true;
    }
    await article.save();
    return res.json({
      status: 'success',
    });
  } catch (err) {
    return next(err);
  }
};

export const putArticle = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const articleDBConnector = new ArticleDBConnector();
    const { id } = req.params;
    const user = await getUser(req);
    const article = (await Article.getById(articleDBConnector, id)) as Article;
    const { title, cover, sections } = req.body;
    article.cover = cover;
    article.title = title;
    article.sections = sections;
    if (!(user instanceof Admin)) {
      article.approved = false;
    }
    await article.save();
    return res.json({ status: 'success' });
  } catch (err) {
    return next(err);
  }
};

export const deleteArticle = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const articleDBConnector = new ArticleDBConnector();
    const { id } = req.params;
    const article = (await Article.getById(articleDBConnector, id)) as Article;
    await article.remove();
    return res.json({ status: 'success' });
  } catch (err) {
    return next(err);
  }
};

export const patchArticleApprove = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const articleDBConnector = new ArticleDBConnector();
    const { id } = req.params;
    const article = (await Article.getById(articleDBConnector, id)) as Article;
    await article.approve();
    return res.json({
      status: 'success',
    });
  } catch (err) {
    return next(err);
  }
};

export const deleteArticleDisapprove = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  try {
    const articleDBConnector = new ArticleDBConnector();
    const { id } = req.params;
    const article = (await Article.getById(articleDBConnector, id)) as Article;
    await article.remove();
    return res.json({ status: 'success' });
  } catch (err) {
    return next(err);
  }
};
