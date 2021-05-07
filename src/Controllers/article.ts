import { Response, NextFunction, Request } from 'express';
import ArticleFileDBConnector from '../Classes/ArticleDBConnector/ArticleFileDBConnector';
import RequestError from '../Classes/Errors/RequestError';
import UserFactory from '../Classes/Factories/UserFactory';
import UserFileDBConnector from '../Classes/UserDBConnectors/UserFileDBConnector';
import getUser from '../Helpers/getUserFromQuery';
import Admin from '../Models/Admin';
import Article from '../Models/Article';
import User from '../Models/User';

const articleFileDBConnector = new ArticleFileDBConnector();
const userFileDBConnector = new UserFileDBConnector();

const userFactory = new UserFactory();

export const getArticles = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const articleModels = await Article.getAllApproved(articleFileDBConnector);
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
    const user = await getUser(req);
    if (!user || !(user instanceof Admin)) {
      const error = new RequestError('Authorization Problem', 401);
      throw error;
    }
    const articleModels = await Article.getAllNotApproved(
      articleFileDBConnector,
    );
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
    const { id } = req.params;
    const article = await Article.getById(articleFileDBConnector, id);
    if (!article) {
      const error = new RequestError('No such article', 404);
      throw error;
    }
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
    const user = await getUser(req);
    if (!user || !(user instanceof User)) {
      const error = new RequestError('Authorization Problem', 401);
      throw error;
    }
    const articles = await Article.getUserArticles(
      articleFileDBConnector,
      user.id,
    );
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
    const { title, cover, sections } = req.body;
    const user = await getUser(req);
    if (!user || !(user instanceof User)) {
      const error = new RequestError('Authorization Problem', 401);
      throw error;
    }
    const article = new Article(
      title,
      cover,
      user.id,
      sections,
      articleFileDBConnector,
    );
    if (user instanceof Admin) {
      article.approved = true;
    } else {
      await Admin.sentArticleToApprove(
        userFileDBConnector,
        article.id,
        userFactory,
      );
    }
    await article.save();
    await user.addArticle(article.id);
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
    const { id } = req.params;
    const user = await getUser(req);
    const article = await Article.getById(articleFileDBConnector, id);
    if (!article) {
      const error = new RequestError('No such article', 404);
      throw error;
    }
    if (!user) {
      const error = new RequestError('Authorization Problem', 401);
      throw error;
    }
    if (!(user instanceof Admin) && !(user.id === article.creator)) {
      const error = new RequestError('Authorization Problem', 401);
      throw error;
    }
    const { title, cover, sections } = req.body;
    article.cover = cover;
    article.title = title;
    article.sections = sections;
    if (!(user instanceof Admin)) {
      article.approved = false;
      await Admin.sentArticleToApprove(
        userFileDBConnector,
        article.id,
        userFactory,
      );
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
    const { id } = req.params;
    const user = await getUser(req);
    const article = await Article.getById(articleFileDBConnector, id);
    if (!article) {
      const error = new RequestError('No such article', 404);
      throw error;
    }
    if (!user) {
      const error = new RequestError('Authorization Problem', 401);
      throw error;
    }
    if (!(user instanceof Admin) && !(user.id === article.creator)) {
      const error = new RequestError('Authorization Problem', 401);
      throw error;
    }
    await Admin.removeArticleFromApprove(userFileDBConnector, id, userFactory);
    await user.removeArticle(article.id);
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
    const { id } = req.params;
    const user = await getUser(req);
    if (!user || !(user instanceof Admin)) {
      const error = new RequestError('Authorization Problem', 401);
      throw error;
    }
    const article = await Article.getById(articleFileDBConnector, id);
    if (!article) {
      const error = new RequestError('No such article', 404);
      throw error;
    }
    await article.approve();
    await Admin.removeArticleFromApprove(
      userFileDBConnector,
      article.id,
      userFactory,
    );
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
    const { id } = req.params;
    const user = await getUser(req);
    const article = await Article.getById(articleFileDBConnector, id);
    if (!article) {
      const error = new RequestError('No such article', 404);
      throw error;
    }
    if (article.approved) {
      const error = new RequestError('Article is already approved', 409);
      throw error;
    }
    if (!user || !(user instanceof Admin)) {
      const error = new RequestError('Authorization Problem', 401);
      throw error;
    }
    await Admin.removeArticleFromApprove(userFileDBConnector, id, userFactory);
    await user.removeArticle(article.id);
    await article.remove();
    return res.json({ status: 'success' });
  } catch (err) {
    return next(err);
  }
};
