import express from 'express';
import multer from 'multer';
import * as ImageController from './image.controller';
import { verifyToken } from '../../auth/middleware/authentication.middleware';
import joiValidationMiddleware from '../../auth/middleware/joiValidationMiddleware';
import imageSchema from './image.schema';
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use(verifyToken);

router
  .get('/:id', ImageController.getImage)
  .delete('/:id', ImageController.deleteImage)
  .patch(
    '/:id',
    upload.single('shop_co_image'),
    verifyToken,
    ImageController.patchImage,
  );
router.post(
  '/',
  upload.single('shop_co_image'),
  joiValidationMiddleware(imageSchema),
  verifyToken,
  ImageController.postImage,
);

export default router;
