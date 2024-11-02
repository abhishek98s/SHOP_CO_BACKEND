import express from 'express';
import { verifyToken } from '../../auth/middleware/authentication.middleware';
import * as ProductSizeController from './product_size.controller';
import joiValidationMiddleware from '../../auth/middleware/joiValidationMiddleware';
import { productSizeSchema } from './product_size.schema';

const router = express.Router();

router.use(verifyToken);
router.post(
  '/',
  joiValidationMiddleware(productSizeSchema),
  ProductSizeController.postProductSize,
);

export default router;
