import knex from '../../config/knex.config';
import { ICategory } from './category.model';

export const fetchAll = async (): Promise<ICategory[]> => {
  return await knex('categories').select('id', 'name');
};

export const fetchById = async (categoryId: number): Promise<ICategory[]> => {
  return await knex('categories').select('name').where('id', categoryId).first();
};

export const fetchByName = async (name: string) => {
  return await knex('categories').where('name', name).first();
};

export const create = async (categoryData: ICategory) => {
  return await knex('categories').insert(categoryData);
};

export const update = async (categoryId: number, categoryData: ICategory) => {
  return await knex('categories').where('id', categoryId).update(categoryData);
};

export const remove = async (categoryId: number) => {
  return await knex('categories').where('id', categoryId).delete();
};
