import express from 'express';
import multer from 'multer';

import { verifyToken } from '../../auth/middleware/authentication.middleware';
import { getProductDetail } from './product.controller';

const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer({ storage });

router.use(verifyToken);

router.get('/:id', getProductDetail);

export default router;
