import knex from '../../config/knex.config';
import { IType } from './type.model';

export const fetchAll = async (): Promise<IType[]> => {
  return await knex('product_types').select('id', 'name');
};

export const fetchById = async (typeId: number): Promise<IType[]> => {
  return await knex('product_types').select('name').where('id', typeId).first();
};

export const fetchByName = async (name: string) => {
  return await knex('product_types').where('name', name).first();
};

export const create = async (typeData: IType) => {
  return await knex('product_types').insert(typeData);
};

export const update = async (typeId: number, typeData: IType) => {
  return await knex('product_types').where('id', typeId).update(typeData);
};

export const remove = async (typeId: number) => {
  return await knex('product_types').where('id', typeId).delete();
};
