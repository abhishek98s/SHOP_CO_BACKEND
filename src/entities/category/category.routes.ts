import express from 'express';
import * as CategoryController from './category.controller';
import joiValidationMiddleware from '../../auth/middleware/joiValidationMiddleware';
import { categorySchema } from './category.schema';
import { verifyToken } from '../../auth/middleware/authentication.middleware';

const router = express();

router.use(verifyToken);

router
  .route('/')
  .get(CategoryController.getCategories)
  .post(
    joiValidationMiddleware(categorySchema),
    CategoryController.postCategory,
  );
router
  .route('/:id')
  .patch(
    joiValidationMiddleware(categorySchema),
    CategoryController.patchCategory,
  )
  .delete(CategoryController.deleteCategory);

export default router;
