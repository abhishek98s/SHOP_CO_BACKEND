import joi, { Schema } from 'joi';import { jwtSchema } from '../../utils/jwt.schema';
export const productSchema: Schema = joi.object().keys({
  name: joi.string().required(),
  description: joi.string().required(),
  rating: joi.number().required(),
  price: joi.number().required(),
  stock_quantity: joi.number().required(),
  discount: joi.number(),
  discounted_price: joi.number(),

  category: joi
    .string()
    .insensitive()
    .valid('top_selling', 'new_arrival', 'normal')
    .required()
    .default('normal'),
  style: joi
    .string()
    .insensitive()
    .valid('casual', 'formal', 'party', 'gym')
    .required()
    .default('casual'),
  type: joi
    .string()
    .insensitive()
    .valid('t-shirts', 'shorts', 'shirts', 'hoodie')
    .required()
    .default('casual'),
  size: joi
    .array()
    .items(
      joi
        .string()
        .insensitive()
        .valid(
          'XX-Small',
          'X-Small',
          'Small',
          'Medium',
          'Large',
          'X-Large',
          'XX-Large',
        ),
    )
    .min(1)
    .required(),

  ...jwtSchema,
});

export const updatProductSchema: Schema = joi.object().keys({
  name: joi.string(),
  description: joi.string(),
  rating: joi.number(),
  price: joi.number(),
  stock_quantity: joi.number(),
  discount: joi.number(),
  discounted_price: joi.number(),

  category: joi
    .string()
    .insensitive()
    .valid('top_selling', 'new_arrival', 'normal')
    .default('normal'),
  style: joi
    .string()
    .insensitive()
    .valid('casual', 'formal', 'party', 'gym')
    .default('casual'),
  type: joi
    .string()
    .insensitive()
    .valid('t-shirts', 'shorts', 'shirts', 'hoodie')
    .default('casual'),
  size: joi
    .array()
    .items(
      joi
        .string()
        .insensitive()
        .valid(
          'XX-Small',
          'X-Small',
          'Small',
          'Medium',
          'Large',
          'X-Large',
          'XX-Large',
        ),
    )
    .min(1),

  ...jwtSchema,
});
