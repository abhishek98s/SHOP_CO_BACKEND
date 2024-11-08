import knex from '../../config/knex.config';
import { IStyle } from './style.model';

export const fetchAll = async (): Promise<IStyle[]> => {
  return await knex('styles').select('id', 'name');
};

export const fetchById = async (styleId: number): Promise<IStyle[]> => {
  return await knex('styles').select('name').where('id', styleId).first();
};

export const fetchByName = async (name: string) => {
  return await knex('styles').where('name', name).first();
};

export const create = async (styleData: IStyle) => {
  return await knex('styles').insert(styleData);
};

export const update = async (styleId: number, styleData: IStyle) => {
  return await knex('styles').where('id', styleId).update(styleData);
};

export const remove = async (styleId: number) => {
  return await knex('styles').where('id', styleId).delete();
};
