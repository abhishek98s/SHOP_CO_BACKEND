import express from 'express';
import * as TypeController from './type.controller';
import joiValidationMiddleware from '../../auth/middleware/joiValidationMiddleware';
import { typeSchema } from './type.schema';
import { verifyToken } from '../../auth/middleware/authentication.middleware';

const router = express();

router.use(verifyToken);

router
  .route('/')
  .get(TypeController.getTypes)
  .post(joiValidationMiddleware(typeSchema), TypeController.postType);
router
  .route('/:id')
  .patch(joiValidationMiddleware(typeSchema), TypeController.patchType)
  .delete(TypeController.deleteType);

export default router;
