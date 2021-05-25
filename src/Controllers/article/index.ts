import { Response, NextFunction, Request } from 'express';
import ArticleDBConnector from '../../Classes/ArticleDBConnector/ArticleSQLDBConnector';
import constructLocationError from '../../Helpers/constructLocationError';
import getUser from '../../Helpers/getUserFromQuery';
import AdminRepository from '../../Repositories/Admin';
import ArticleRepository from '../../Repositories/Article';
import UserRepository from '../../Repositories/User';
import { LOCATIONS } from './constants';

export const getArticles = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const articleDBConnector = new ArticleDBConnector();
    const articleModels = await ArticleRepository.getAllApproved(
      articleDBConnector,
    );
    const articles = articleModels.map(article => article.toObject());
    return res.json({
      articles,
    });
  } catch (err) {
    const locationError = constructLocationError(err, LOCATIONS.GET_ARTICLES);
    return next(locationError);
  }
};

export const getNotApprovedArticles = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const articleDBConnector = new ArticleDBConnector();
    const articleModels = await ArticleRepository.getAllNotApproved(
      articleDBConnector,
    );
    const articles = articleModels.map(article => article.toObject());
    return res.json({
      articles,
    });
  } catch (err) {
    const locationError = constructLocationError(
      err,
      LOCATIONS.GET_NOT_APPROVED_ARTICLES,
    );
    return next(locationError);
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
    const article = (await ArticleRepository.getById(
      articleDBConnector,
      id,
    )) as ArticleRepository;
    return res.json(article.toObject());
  } catch (err) {
    const locationError = constructLocationError(
      err,
      LOCATIONS.GET_ARTICLE_BY_ID,
    );
    return next(locationError);
  }
};

export const getArticlesUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const articleDBConnector = new ArticleDBConnector();
    const { auth } = req.query;
    const user = (await getUser(auth as string)) as UserRepository;
    const articleModels = await ArticleRepository.getUserArticles(
      articleDBConnector,
      user.id,
    );
    const articles = articleModels.map(model => model.toObject());
    console.log(articles);
    return res.json({
      articles,
    });
  } catch (err) {
    const locationError = constructLocationError(
      err,
      LOCATIONS.GET_ARTICLES_USER,
    );
    return next(locationError);
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
    const { auth } = req.query;
    const user = (await getUser(auth as string)) as UserRepository;
    const article = new ArticleRepository(
      title,
      cover,
      user.id,
      sections,
      articleDBConnector,
    );
    if (user instanceof AdminRepository) {
      article.approved = true;
    }
    await article.save();
    return res.json({
      status: 'success',
    });
  } catch (err) {
    const locationError = constructLocationError(err, LOCATIONS.POST_ARTICLE);
    return next(locationError);
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
    const { auth } = req.query;
    const user = await getUser(auth as string);
    const article = (await ArticleRepository.getById(
      articleDBConnector,
      id,
    )) as ArticleRepository;
    const { title, cover, sections } = req.body;
    article.cover = cover;
    article.title = title;
    article.sections = sections;
    if (!(user instanceof AdminRepository)) {
      article.approved = false;
    }
    await article.save();
    return res.json({ status: 'success' });
  } catch (err) {
    const locationError = constructLocationError(err, LOCATIONS.PUT_ARTICLE);
    return next(locationError);
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
    const article = (await ArticleRepository.getById(
      articleDBConnector,
      id,
    )) as ArticleRepository;
    await article.remove();
    return res.json({ status: 'success' });
  } catch (err) {
    const locationError = constructLocationError(err, LOCATIONS.DELETE_ARTICLE);
    return next(locationError);
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
    const article = (await ArticleRepository.getById(
      articleDBConnector,
      id,
    )) as ArticleRepository;
    await article.approve();
    return res.json({
      status: 'success',
    });
  } catch (err) {
    const locationError = constructLocationError(
      err,
      LOCATIONS.PATCH_ARTICLE_APPROVE,
    );
    return next(locationError);
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
    const article = (await ArticleRepository.getById(
      articleDBConnector,
      id,
    )) as ArticleRepository;
    await article.remove();
    return res.json({ status: 'success' });
  } catch (err) {
    const locationError = constructLocationError(
      err,
      LOCATIONS.DELETE_ARTICLE_DISAPPROVE,
    );
    return next(locationError);
  }
};
