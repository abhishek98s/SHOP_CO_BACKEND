import express from 'express';
import multer from 'multer';

import { verifyToken } from '../../auth/middleware/authentication.middleware';
import * as ProductController from './product.controller';

const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer({ storage });

router.use(verifyToken);

router.get('/new_arrival', ProductController.getNewSellingProducts);
router.get('/top_selling', ProductController.getTopSellingProducts);
router.get('/:id', ProductController.getProductDetail);

export default router;
