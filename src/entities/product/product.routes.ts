import express from 'express';
import multer from 'multer';

import { verifyToken } from '../../auth/middleware/authentication.middleware';
import * as ProductController from './product.controller';
import joiValidationMiddleware from '../../auth/middleware/joiValidationMiddleware';
import { productSchema } from './product.schema';

const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer({ storage });

router.use(verifyToken);

router.get('/new_arrival', ProductController.getNewSellingProducts);
router.get('/top_selling', ProductController.getTopSellingProducts);

router.post(
  '/',
  upload.single('shop_co_image'),
  joiValidationMiddleware(productSchema),
  ProductController.postProduct,
);

router.route('/:id').get(ProductController.getProductDetail);

export default router;
