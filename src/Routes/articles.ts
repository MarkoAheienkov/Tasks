import { Router } from 'express';

import * as articleController from '../TypeORMControllers/article';

import middleWares from '../TypeORMMiddlewares';

const router = Router();

router.get('/', articleController.getArticles);

router.get(
  '/not-approved',
  middleWares.isAuth,
  middleWares.isAdminAuthentification,
  articleController.getNotApprovedArticles,
);

router.get('/user', middleWares.isAuth, articleController.getArticlesUser);

router.get('/:id', articleController.getArticleById);

router.post('/', middleWares.isAuth, articleController.postArticle);

router.patch(
  '/approve/:id',
  middleWares.isAuth,
  middleWares.isAdminAuthentification,
  middleWares.isArticleApproved,
  articleController.patchArticleApprove,
);

router.put(
  '/:id',
  middleWares.isAuth,
  middleWares.isArticleCreators,
  articleController.putArticle,
);

router.delete(
  '/disapprove/:id',
  middleWares.isAuth,
  middleWares.isAdminAuthentification,
  articleController.deleteArticleDisapprove,
);

router.delete(
  '/:id',
  middleWares.isAuth,
  middleWares.isArticleCreators,
  articleController.deleteArticle,
);

export default router;
