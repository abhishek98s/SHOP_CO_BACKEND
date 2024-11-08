import joi, { Schema } from 'joi';import { jwtSchema } from '../../utils/jwt.schema';

export const postReviewSchema: Schema = joi.object().keys({
  rating: joi.number().required(),
  comment: joi.string().required(),
  product_id: joi.number().required(),
  user_id: joi.number().required(),

  ...jwtSchema,
});

export const patchReviewSchema: Schema = joi.object().keys({
  rating: joi.number(),
  comment: joi.string(),
  product_id: joi.number(),
  user_id: joi.number(),

  ...jwtSchema,
});

