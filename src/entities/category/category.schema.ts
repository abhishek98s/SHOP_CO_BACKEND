import joi, { Schema } from 'joi';
import { jwtSchema } from '../../utils/jwt.schema';

export const categorySchema: Schema = joi.object().keys({
  name: joi.string().required(),

  ...jwtSchema,
});
