import joi from 'joi';
export const jwtSchema = {
  user: joi.object().keys({
    id: joi.number().required(),
    username: joi.string().required(),
    email: joi.string().required(),
    phone: joi.string().required(),
    role: joi.allow('seller', 'user', 'admin').required(),
    iat: joi.number(),
  }),
};
