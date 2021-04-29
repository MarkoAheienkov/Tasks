import { Response, NextFunction, Request } from 'express';
import ArticleFileDBConnector from '../Classes/ArticleDBConnector/ArticleFileDBConnector';
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
    const articles = await Article.getAll(articleFileDBConnector);
    const admins = await Admin.getAllAdmins(userFileDBConnector, userFactory);
    console.log(admins);
    return res.json({
      articles,
      admins,
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
      const error = new Error('No suche article');
      throw error;
    }
    return res.json(article);
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
    const { title, body } = req.body;
    const user = await getUser(req);
    if (!user || !(user instanceof User)) {
      const error = new Error('Authorization Problem');
      throw error;
    }
    const article = new Article(title, body, user.id, articleFileDBConnector);
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
      const error = new Error('No such article');
      throw error;
    }
    if (!user) {
      const error = new Error('Authorization Problem');
      throw error;
    }
    if (!(user instanceof Admin) && !(user.id === article.creator)) {
      const error = new Error('Authorization Problem');
      throw error;
    }
    const { title, body } = req.body;
    article.body = body;
    article.title = title;
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
      const error = new Error('No such article');
      throw error;
    }
    if (!user) {
      const error = new Error('Authorization Problem');
      throw error;
    }
    if (!(user instanceof Admin) && !(user.id === article.creator)) {
      const error = new Error('Authorization Problem');
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
      const error = new Error('Authorization Problem');
      throw error;
    }
    const article = await Article.getById(articleFileDBConnector, id);
    if (!article) {
      const error = new Error('No such article');
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
      const error = new Error('No such article');
      throw error;
    }
    if (article.approved) {
      const error = new Error('Article is already approved');
      throw error;
    }
    if (!user || !(user instanceof Admin)) {
      const error = new Error('Authorization Problem');
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
