import express from 'express';
import multer from 'multer';
import { verifyToken } from '../../auth/middleware/authentication.middleware';
import * as ProductController from './product.controller';
import joiValidationMiddleware, {
  joiQueryValidationMiddleware,
} from '../../auth/middleware/joiValidationMiddleware';
import {
  filterProductSchema,
  productSchema,
  updatProductSchema,
} from './product.schema';

const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer({ storage });

router.use(verifyToken);

router.get('/new_arrival', ProductController.getNewSellingProducts);
router.get('/top_selling', ProductController.getTopSellingProducts);

router
  .route('/')
  .get(
    joiQueryValidationMiddleware(filterProductSchema),
    ProductController.getAllProducts,
  )
  .post(
    upload.single('shop_co_image'),
    verifyToken,
    joiValidationMiddleware(productSchema),
    ProductController.postProduct,
  );

router
  .route('/:id')
  .get(ProductController.getProductDetail)
  .patch(
    upload.single('shop_co_image'),
    verifyToken,
    joiValidationMiddleware(updatProductSchema),
    ProductController.patchProduct,
  )
  .delete(ProductController.deleteProduct);

export default router;
