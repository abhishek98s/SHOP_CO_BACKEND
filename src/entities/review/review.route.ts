import express from 'express';import * as ReviewController from './review.controller';import { patchReviewSchema, postReviewSchema } from './review.schema';
import { verifyToken } from '../../auth/middleware/authentication.middleware';
import joiValidationMiddleware from '../../auth/middleware/joiValidationMiddleware';

const router = express();

router.use(verifyToken);

router
  .route('/')
  .get(ReviewController.getReviews)
  .post(joiValidationMiddleware(postReviewSchema), ReviewController.postReview);

router
  .route('/:id')
  .get(ReviewController.getReviewsByProductId)
  .patch(
    joiValidationMiddleware(patchReviewSchema),
    ReviewController.patchReview,
  )
  .delete(ReviewController.deleteReview);

export default router;
