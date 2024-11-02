import joi, { Schema } from 'joi';
import { jwtSchema } from '../../utils/jwt.schema';
export const productSizeSchema: Schema = joi.object().keys({
  product_id: joi.number().required(),
  size_id: joi.number().required(),

  ...jwtSchema,
});
