import knex from '../../config/knex.config';
import { IProduct_size } from './product_size.model';

export const create = async (
  productSizeObj: IProduct_size,
): Promise<{ pstlb_id: number }> => {
  const pstlb = await knex('products_sizes')
    .insert(productSizeObj)
    .returning('id');
  const id = pstlb[0].id;
  return { pstlb_id: id };
};
