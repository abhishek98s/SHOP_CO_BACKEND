import joi, { Schema } from 'joi';
import { jwtSchema } from '../../utils/jwt.schema';

export const userSchema: Schema = joi.object().keys({
  username: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.string().min(10).required(),
  password: joi
    .string()
    .min(8)
    .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/))
    .required(),
  image_id: joi.number(),
  role: joi.string().valid('seller', 'user', 'admin'),

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
