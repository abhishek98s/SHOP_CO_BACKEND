import joi, { Schema } from 'joi';import { jwtSchema } from '../../utils/jwt.schema';

export const productSchema: Schema = joi.object().keys({
  name: joi.string().required(),
  description: joi.string().required(),
  rating: joi.number().required(),
  price: joi.number().required(),
  stock_quantity: joi.number().required(),

  ...jwtSchema,
});
