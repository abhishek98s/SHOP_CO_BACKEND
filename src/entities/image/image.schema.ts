import joi, { Schema } from 'joi';

const imageSchema: Schema = joi.object().keys({
  caption: joi.string().required(),
  url: joi.string().required(),
});

export default imageSchema;
