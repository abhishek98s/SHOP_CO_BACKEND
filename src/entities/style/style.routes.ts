import express from 'express';
import * as StyleController from './style.controller';
import joiValidationMiddleware from '../../auth/middleware/joiValidationMiddleware';
import { styleSchema } from './style.schema';
import { verifyToken } from '../../auth/middleware/authentication.middleware';

const router = express();

router.use(verifyToken);

router
  .route('/')
  .get(StyleController.getStyles)
  .post(joiValidationMiddleware(styleSchema), StyleController.postStyle);
router
  .route('/:id')
  .patch(joiValidationMiddleware(styleSchema), StyleController.patchStyle)
  .delete(StyleController.deleteStyle);

export default router;
