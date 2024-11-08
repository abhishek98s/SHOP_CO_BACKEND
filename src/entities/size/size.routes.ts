import express from 'express';
import * as SizeController from './size.controller';
import joiValidationMiddleware from '../../auth/middleware/joiValidationMiddleware';
import { sizeSchema } from './size.schema';
import { verifyToken } from '../../auth/middleware/authentication.middleware';

const router = express();

router.use(verifyToken);

router
  .route('/')
  .get(SizeController.getSizes)
  .post(joiValidationMiddleware(sizeSchema), SizeController.postSize);
router
  .route('/:id')
  .patch(joiValidationMiddleware(sizeSchema), SizeController.patchSize)
  .delete(SizeController.deleteSize);

export default router;
