import { Router } from 'express';
import ArticleController from '../../controllers/ArticleController';
import ArticleValidation from '../../middlewares/validations/ArticleValidation';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import AuthManager from '../../middlewares/AuthManager';

const articleRoutes = Router();
articleRoutes.get('/search', ArticleController.search);

articleRoutes.post(
  '/articles',
  AuthMiddleware.checkIfUserIsAuthenticated,
  ArticleValidation.validateArticleData,
  ArticleValidation.sanitizeArticleContent,
  ArticleValidation.checkIfArticleExist,
  ArticleController.create
);
articleRoutes.get(
  '/articles',
  ArticleValidation.verifyLimitParams,
  ArticleValidation.verifyPageParams,
  ArticleController.fetchAll
);
articleRoutes.get(
  '/articles/:slug',
  AuthManager.checkAuthStatus,
  ArticleController.fetchOne
);
articleRoutes.put(
  '/articles/:slug',
  AuthMiddleware.checkIfUserIsAuthenticated,
  ArticleValidation.verifyUserOwnStory,
  ArticleValidation.constructArticleUpdateData,
  ArticleValidation.validateArticleData,
  ArticleController.update
);
articleRoutes.delete(
  '/articles/:slug',
  AuthMiddleware.checkIfUserIsAuthenticated,
  ArticleValidation.verifyUserOwnStory,
  ArticleController.remove
);
articleRoutes.get(
  '/articles/share/:slug',
  ArticleController.share
);

export default articleRoutes;
