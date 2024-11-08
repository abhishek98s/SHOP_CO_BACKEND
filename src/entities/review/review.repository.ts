import knex from '../../config/knex.config';import { IReview } from './review.model';export const fetchAll = async (): Promise<IReview[]> => {
  return await knex('reviews')
    .select(
      'reviews.id',
      'reviews.rating',
      'reviews.comment',
      'reviews.product_id',
      'users.username as username',
    )
    .leftJoin('users', 'reviews.user_id', 'users.id');
};

export const fetchById = async (reviewId: number): Promise<IReview> => {
  return await knex('reviews')
    .select(
      'reviews.id',
      'reviews.rating',
      'reviews.comment',
      'reviews.product_id',
      'users.username as username',
    )
    .leftJoin('users', 'reviews.user_id', 'users.id')
    .where('reviews.id', reviewId)
    .first();
};

export const fetchByProductId = async (reviewId: number): Promise<IReview> => {
  return await knex('reviews')
    .select(
      'reviews.rating',
      'reviews.comment',
      'reviews.product_id',
      'users.username as username',
    )
    .leftJoin('users', 'reviews.user_id', 'users.id')
    .where('reviews.product_id', reviewId)
    .first();
};

export const create = async (reviewData: IReview) => {
  return await knex('reviews').insert(reviewData);
};

export const update = async (
  reviewId: number,
  reviewData: Partial<IReview>,
) => {
  return await knex('reviews').where('id', reviewId).update(reviewData);
};

export const remove = async (reviewId: number) => {
  return await knex('reviews').where('id', reviewId).delete();
};
