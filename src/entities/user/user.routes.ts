import express from 'express';
import multer from 'multer';

import { deleteUser, getUser, postUser, patchUser } from './user.controller';
import { verifyToken } from '../../auth/middleware/authentication.middleware';
import joiValidationMiddleware from '../../auth/middleware/joiValidationMiddleware';
import { userPatchSchema, userSchema } from './user.schema';
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use(verifyToken);

router
  .get('/:id', getUser)
  .patch(
    '/:id',
    upload.single('shop_co_image'),
    joiValidationMiddleware(userPatchSchema),
    patchUser,
  )
  .delete('/:id', deleteUser);
router.post(
  '/',
  upload.single('shop_co_image'),
  joiValidationMiddleware(userSchema),
  postUser,
);

export default router;
