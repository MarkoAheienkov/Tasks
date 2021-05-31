import { Router } from 'express';

import * as articleController from '../Controllers/article';

import middleWares from '../Middlewares';

const router = Router();

router.get('/', articleController.getArticles);

router.get(
  '/not-approved',
  middleWares.isAdminAuthentification,
  articleController.getNotApprovedArticles,
);

router.get(
  '/user',
  middleWares.isUserAuthentification,
  articleController.getArticlesUser,
);

router.get('/:id', articleController.getArticleById);

router.post(
  '/',
  middleWares.isUserAuthentification,
  articleController.postArticle,
);

router.patch(
  '/approve/:id',
  middleWares.isAdminAuthentification,
  middleWares.isArticleApproved,
  articleController.patchArticleApprove,
);

router.put(
  '/:id',
  middleWares.isUserAuthentification,
  middleWares.isArticleCreators,
  articleController.putArticle,
);

router.delete(
  '/disapprove/:id',
  middleWares.isAdminAuthentification,
  articleController.deleteArticleDisapprove,
);

router.delete(
  '/:id',
  middleWares.isUserAuthentification,
  middleWares.isArticleCreators,
  articleController.deleteArticle,
);

export default router;
