import knex from '../../config/knex.config';
import { IImage } from './image.model';

export const fetchById = async (imageId: number): Promise<IImage> => {
  return await knex('images')
    .select('id', 'caption', 'url')
    .where('id', imageId)
    .first();
};

export const create = async (
  imageData: IImage,
): Promise<{ image_id: number }> => {
  const image = await knex('images').insert(imageData).returning('id');
  const id = image[0].id;
  return { image_id: id };
};

export const update = async (
  imageData: IImage,
  imageId: number,
): Promise<number> => {
  return await knex('images').where('id', imageId).update(imageData);
};

export const remove = async (imageId: number): Promise<number> => {
  return await knex('images').delete().where('id', imageId);
};
