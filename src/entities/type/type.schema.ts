import joi, { Schema } from 'joi';
import { jwtSchema } from '../../utils/jwt.schema';

export const typeSchema: Schema = joi.object().keys({
  name: joi.string().required(),

  ...jwtSchema,
});
