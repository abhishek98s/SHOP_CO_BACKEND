import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IReview } from './review.model';
import * as ReviewService from './review.service';
import * as ReviewController from './review.service';
import { customHttpError } from '../../utils/customErrorHandler';
import { reviewSuccessMessages } from './constant/reviewSuccessMessages';
import { reviewExceptionMessages } from './constant/reviewExceptionMessages';

export const getReviews = async (req: Request, res: Response) => {
  const reviews = await ReviewService.getReviews();

  res.status(StatusCodes.OK).json({ success: true, data: reviews });
};

export const getReviewsByProductId = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);

  if (isNaN(productId))
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      reviewExceptionMessages.INVALID_ID,
    );

  const reviews = await ReviewService.getReviewsByProductId(productId);

  res.status(StatusCodes.OK).json({ success: true, data: reviews });
};

export const postReview = async (req: Request, res: Response) => {
  const { rating, comment, product_id, user_id, user } = req.body;

  if (
    isNaN(parseFloat(rating)) ||
    isNaN(parseInt(product_id)) ||
    isNaN(parseInt(user_id))
  ) {
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      reviewExceptionMessages.INVALID_ID,
    );
  }

  const reviewObj: IReview = {
    rating,
    comment,
    product_id,
    user_id,

    created_by: user.username,
    updated_by: user.username,
  };

  await ReviewController.postReview(reviewObj);

  res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: reviewSuccessMessages.POST_SUCCESS });
};

export const patchReview = async (req: Request, res: Response) => {
  const { rating, comment, product_id, user_id, user } = req.body;
  const reviewId = parseInt(req.params.id);

  if (isNaN(reviewId)) {
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      reviewExceptionMessages.INVALID_ID,
    );
  }

  const reviewObj: Partial<IReview> = {
    updated_by: user.username,
  };

  Object.assign(reviewObj, {
    ...(rating && { rating }),
    ...(comment && { comment }),
    ...(product_id && { product_id }),
    ...(user_id && { user_id }),
  });

  await ReviewService.patchReview(reviewId, reviewObj);

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: reviewSuccessMessages.PATCH_SUCCESS });
};

export const deleteReview = async (req: Request, res: Response) => {
  const reviewId = parseInt(req.params.id);

  if (isNaN(reviewId)) {
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      reviewExceptionMessages.INVALID_ID,
    );
  }

  await ReviewService.deleteReview(reviewId);

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: reviewSuccessMessages.DELETE_SUCCESS });
};
