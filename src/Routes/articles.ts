import { Router } from 'express';

import * as articleController from '../Controllers/article';

const router = Router();

router.get('/', articleController.getArticles);

router.get('/not-approved', articleController.getNotApprovedArticles);

router.get('/user', articleController.getArticlesUser);

router.get('/:id', articleController.getArticleById);

router.post('/', articleController.postArticle);

router.patch('/approve/:id', articleController.patchArticleApprove);

router.put('/:id', articleController.putArticle);

router.delete('/disapprove/:id', articleController.deleteArticleDisapprove);

router.delete('/:id', articleController.deleteArticle);

export default router;
