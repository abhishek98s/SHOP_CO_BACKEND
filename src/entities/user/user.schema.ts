import joi, { Schema } from 'joi';
import { jwtSchema } from '../../utils/jwt.schema';

export const userSchema: Schema = joi.object().keys({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(8)
    .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/))
    .required(),
  image_id: joi.number(),
  role: joi.string().valid('normal', 'admin'),

  ...jwtSchema,
});

export const userPatchSchema: Schema = joi.object().keys({
  username: joi.string().required(),
  password: joi
    .string()
    .min(8)
    .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/))
    .required(),

  ...jwtSchema,
});
