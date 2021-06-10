import { Response, NextFunction, Request } from 'express';
import constructLocationError from '../../Helpers/constructLocationError';
import typeORMConnect from '../../Connect/typeORMConnect';
import { LOCATIONS } from './constants';
import Articles from '../../Entities/article';
import { SUCCESS_MESSAGES } from '../../Constants';
import ArticleRepository from '../../TypeORMRepositories/Articles';
import Users from '../../Entities/user';

export const getArticles = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const connection = await typeORMConnect.getConnect();
    const articleRepository = connection.getRepository(Articles);
    const articles = await articleRepository.find({
      where: [{ approved: true }],
    });
    return res.json({ articles });
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
    const connection = await typeORMConnect.getConnect();
    const articleRepository = connection.getRepository(Articles);
    const articles = await articleRepository.find({
      where: [{ approved: false }],
    });
    return res.json({ articles });
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
    const { id } = req.params;
    const connect = await typeORMConnect.getConnect();
    const articleRepository = connect.getCustomRepository(ArticleRepository);
    const article = await articleRepository.getFullArticle(id);
    return res.json(article);
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
    const user = req.user as Users;
    const connect = await typeORMConnect.getConnect();
    let articles;
    const articlesRepository = connect.getRepository(Articles);
    if (user) {
      articles = await articlesRepository.find({
        where: [{ creator: user.user_id }],
      });
    }
    return res.json({ articles });
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
    const articleData = req.body;
    const user = req.user as Users;
    const connection = await typeORMConnect.getConnect();
    await connection.transaction(async manager => {
      const articleRepository = manager.getCustomRepository(ArticleRepository);
      if (user) {
        await articleRepository.createAndSave(articleData, user);
      }
    });
    return res.json({ status: SUCCESS_MESSAGES.SUCCESS });
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
    const articleData = req.body;
    const { id } = req.params;
    const user = req.user as Users;
    const connection = await typeORMConnect.getConnect();
    await connection.transaction(async manager => {
      const articleRepository = manager.getCustomRepository(ArticleRepository);
      const article = await articleRepository.findOne({
        where: [{ article_id: id }],
      });
      if (article) {
        await articleRepository.remove(article);
      }
      if (user) {
        await articleRepository.createAndSave(
          articleData,
          user,
          article?.article_id,
        );
      }
    });
    return res.json({ status: SUCCESS_MESSAGES.SUCCESS });
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
    const { id } = req.params;
    const connection = await typeORMConnect.getConnect();
    const articleRepository = connection.getRepository(Articles);
    const article = await articleRepository.findOne({
      where: [{ article_id: id }],
    });
    if (article) {
      await articleRepository.remove(article);
    }
    return res.json({ status: SUCCESS_MESSAGES.SUCCESS });
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
    const { id } = req.params;
    const connection = await typeORMConnect.getConnect();
    const articleRepository = connection.getRepository(Articles);
    const article = await articleRepository.findOne({
      where: [{ article_id: id }],
    });
    if (article) {
      article.approved = true;
      await articleRepository.save(article);
    }
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
    const { id } = req.params;
    const connection = await typeORMConnect.getConnect();
    const articleRepository = connection.getRepository(Articles);
    const article = await articleRepository.findOne({
      where: [{ article_id: id }],
    });
    if (article) {
      await articleRepository.remove(article);
    }
    return res.json({ status: SUCCESS_MESSAGES.SUCCESS });
  } catch (err) {
    const locationError = constructLocationError(
      err,
      LOCATIONS.DELETE_ARTICLE_DISAPPROVE,
    );
    return next(locationError);
  }
};
