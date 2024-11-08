import { StatusCodes } from 'http-status-codes';import { IReview } from './review.model';
import * as ProductDAO from '../product/product.repository';
import * as ReviewDAO from './review.repository';
import { customHttpError } from '../../utils/customErrorHandler';
import { reviewExceptionMessages } from './constant/reviewExceptionMessages';
export const getReviews = async () => {
  return await ReviewDAO.fetchAll();
};

export const getReviewsByProductId = async (productId: number) => {
  const product = await ProductDAO.fetchById(productId);

  if (!product)
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      reviewExceptionMessages.NOT_FOUND,
    );

  return await ReviewDAO.fetchByProductId(productId);
};

export const postReview = async (reviewData: IReview) => {
  return await ReviewDAO.create(reviewData);
};

export const patchReview = async (
  reviewId: number,
  reviewData: Partial<IReview>,
) => {
  const currentReview = await ReviewDAO.fetchById(reviewId);

  if (!currentReview)
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      reviewExceptionMessages.NOT_FOUND,
    );

  const {
    rating = currentReview.rating,
    user_id = currentReview.user_id,
    product_id = currentReview.product_id,
    comment = currentReview.comment,
  } = reviewData;

  const updatedData = {
    rating,
    user_id,
    product_id,
    comment,
  };

  return await ReviewDAO.update(reviewId, updatedData);
};

export const deleteReview = async (reviewId: number) => {
  const isAvailable = await ReviewDAO.fetchById(reviewId);

  if (!isAvailable)
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      reviewExceptionMessages.NOT_FOUND,
    );

  return await ReviewDAO.remove(reviewId);
};
