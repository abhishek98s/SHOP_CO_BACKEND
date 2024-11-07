import knex from '../../config/knex.config';
import { ISize } from './size.model';

export const fetchAll = async (): Promise<ISize[]> => {
  return await knex('sizes').select('id', 'name');
};

export const fetchById = async (sizeId: number): Promise<ISize[]> => {
  return await knex('sizes').select('name').where('id', sizeId).first();
};

export const fetchByName = async (name: string) => {
  return await knex('sizes').where('name', name).first();
};

export const create = async (sizeData: ISize) => {
  return await knex('sizes').insert(sizeData);
};

export const update = async (sizeId: number, sizeData: ISize) => {
  return await knex('sizes').where('id', sizeId).update(sizeData);
};

export const remove = async (sizeId: number) => {
  return await knex('sizes').where('id', sizeId).delete();
};
